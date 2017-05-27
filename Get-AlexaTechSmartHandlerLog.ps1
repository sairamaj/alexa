$logStream = (Get-CWLLogStreams -LogGroupName /aws/lambda/techSmartHandler -Region us-east-1 | select -first 1)
if( $logStream -ne $null)
{
    $events = (Get-CWLLogEvents -LogGroupName /aws/lambda/techSmartHandler -LogStreamName $logStream.LogStreamName -Region us-east-1 ).Events
    $events
}
else
{
    Write-Host "No logs."
}