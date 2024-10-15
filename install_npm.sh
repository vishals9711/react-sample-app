## Remove old node_modules
sudo rm -rf frontend/node_modules
sudo rm -rf backend/node_modules

## Clear npm cache
npm cache clean --force
npm cache verify

## Get start time
start_time=$(date +%s)

## Install dependencies using npm
cd frontend
npm install --legacy-peer-deps
cd ../backend
npm install

## Get end time
end_time=$(date +%s)

## Calculate time difference
time_diff=$(( $end_time - $start_time ))
echo "Time taken to install dependencies: $time_diff seconds"

# backend_node_modules_size=$(du -sh backend/node_modules | awk '{print $1}')
# frontend_node_modules_size=$(du -sh frontend/node_modules | awk '{print $1}')

# echo "backend node_modules size: $backend_node_modules_size"
# echo "frontend node_modules size: $frontend_node_modules_size"

