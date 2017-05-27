Write-Progress "Zipping it..."
.\zipfolder.ps1 -Source c:\sai\dev\alexa\src -Destination C:\sai\dev\alexa\src.zip
Write-Progress "Uploading src.zip to S3 bucket..."
Write-S3Object -BucketName alex-techsmart -Key src -File .\src.zip -CannedACLName public-read
Write-Progress "Updating lambda function..."
Update-LMFunctionCode -FunctionName techSmartHandler -BucketName alex-techsmart -Key src -Force -Region us-east-1
Write-Progress "Done."
Write-Host "Done."

