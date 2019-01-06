echo off
echo "remove current deploy"
rmdir deploy/s
MD deploy
MD deploy\dist

echo "copying /api..."
XCOPY api\dist deploy\dist /F /R /Y /S
COPY api\package.json deploy
xcopy api\config.json deploy\ /F /R /Y 
xcopy api\*.key deploy\ /F /R /Y 
xcopy api\*.crt deploy\ /F /R /Y 

echo "copying dashboard..."
MD deploy\dashboard\dist\dashboard  
XCOPY dashboard\dist\dashboard deploy\dashboard\dist\dashboard /F /R /Y /S
