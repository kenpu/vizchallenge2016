data:
	mkdir -p ./data
	wget -O ./data/northern.nc http://db.science.uoit.ca/~vizchallenge/northernLatitudes.nc 

clean:
	rm -rf ./data
