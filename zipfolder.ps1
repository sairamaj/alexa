param(
    $Source,
    $Destination
)

 If(Test-path $Destination) 
 {
     Remove-item $Destination
 }
Add-Type -assembly "system.io.compression.filesystem"
[io.compression.zipfile]::CreateFromDirectory($Source, $Destination)
