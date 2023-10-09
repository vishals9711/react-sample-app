cd frontend
npm install --legacy-peer-deps
npm run build
## If build fails stop script
if [ $? -ne 0 ]; then
  exit 1
fi
# rm -rf node_modules

cd ../backend
npm install
npm run build
## If build folder already exists, remove it
if [ -d "build" ]; then
  rm -rf build
fi
mkdir build
## Copy content from frontend/build to backend/build
cp -r ../frontend/build/* build
## Run server
npm run start