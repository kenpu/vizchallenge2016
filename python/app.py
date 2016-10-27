import flask
from flask import Flask, request
from netCDF4 import Dataset
import os, sys
import time
import json

app = Flask(__name__)

if not sys.argv[1:]:
    print "Usage: <vizdir>"
    sys.exit(0)

DIR = sys.argv[1]
DS = dict()

def error(msg):
    return flask.jsonify(dict(error=msg))

@app.route("/data")
def api_data():
    ds  = request.args.get("ds")
    z_t = request.args.get("z_t")           # 0 .. 25
    t   = request.args.get("t")             # 0 .. 364
    var = request.args.get("var")           # SALT PD ...
    grid = request.args.get('grid') or ""   # U or T

    print ds, z_t, t, var
    
    z_t = int(z_t)
    t   = int(t)

    try:
        return flask.jsonify(get_data(ds, t, z_t, var, grid))
    except Exception, e:
        return error(e)

def get_data(ds, t, z_t, var, grid):
    data = None

    dataset = DS.get(ds)
    if not dataset:
        raise("Dataset %s not found" % ds)

    lat = dataset.variables['TLAT'] if grid.startswith('t') else dataset.variables['ULAT']
    lon = dataset.variables['TLONG'] if grid.startswith('t') else dataset.variables['ULONG']

    try:
        v = dataset.variables[var]
    except:
        raise("Variable %s not found" % var)

    try:
        _, _, m, n = v.shape
    except:
        raise("Can only support standard vars, not shape %s" % v.shape)

    v = v[t, z_t, :, :]

    data = dict(grid=[[float(lat[i,j]), 
                       float(lon[i,j]), 
                       float(v[i,j])] for i in range(m) for j in range(n)])

    return data

if __name__ == '__main__':
    if not DIR:
        print "Need to set environment variable DIR"
        sys.exit(0)

    DS["northern"] = Dataset(os.path.join(DIR, "northernLatitudes.nc"), "r")
    DS["tropical"] = Dataset(os.path.join(DIR, "tropicalPacific.nc"), "r")

    app.run(host="0.0.0.0", port=10000, debug=True)
