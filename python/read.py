from netCDF4 import Dataset
import sys

if not sys.argv[1:]:
    print "Usage: <ncfile>"
    sys.exit(0)

ncfile = sys.argv[1]

ds = Dataset(ncfile, 'r')

# Dump the metadata

attrs = ds.ncattrs()
dims = ds.dimensions

for varname in list(ds.variables):
    var = ds.variables[varname]
    print "%s: %d" % (varname, var.size)
