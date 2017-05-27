$logGroupName = '/aws/lambda/techSmartHandler'
$logStream = (Get-CWLLogStreams -LogGroupName $logGroupName -Region us-east-1 | select -first 1)
Remove-CWLLogStream -LogGroupName $logGroupName  -LogStreamName $logStream.LogStreamName -Force -Region us-east-1