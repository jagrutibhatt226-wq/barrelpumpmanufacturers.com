
# ============================================
# PRODUCT IMAGE AUTO RENAME SCRIPT
# product1.png to product30.png
# Image names will match product names in JS
# ============================================

# Your JavaScript file
$jsFile = "js\main.js"

# Image folder
$imageFolder = ".\img"

# ============================================
# CHECK FILES AND FOLDER
# ============================================

if (!(Test-Path $jsFile)) {
    Write-Host "JS file nahi mili: $jsFile" -ForegroundColor Red
    Write-Host "Apni actual JS file ka path set karein."
    pause
    exit
}

if (!(Test-Path $imageFolder)) {
    Write-Host "img folder nahi mila: $imageFolder" -ForegroundColor Red
    pause
    exit
}

$content = Get-Content $jsFile -Raw

# Match each product name and image path
$pattern = 'name\s*:\s*"([^"]+)"[\s\S]*?image\s*:\s*"img/product(\d+)\.png"'
$matches = [regex]::Matches($content, $pattern)

if ($matches.Count -eq 0) {
    Write-Host "Product mapping nahi mili." -ForegroundColor Red
    Write-Host "Check karein ki JS mein name aur image paths isi format mein hain."
    pause
    exit
}

$nameCount = @{}
$renameList = @()
$usedNumbers = @{}

foreach ($match in $matches) {

    $productName = $match.Groups[1].Value.Trim()
    $number = [int]$match.Groups[2].Value

    if ($number -lt 1 -or $number -gt 30) {
        continue
    }

    if ($usedNumbers.ContainsKey($number)) {
        Write-Host "Duplicate product number: $number" -ForegroundColor Red
        pause
        exit
    }
    $usedNumbers[$number] = $true

    # Convert product name to uppercase filename
    $newName = $productName.ToUpperInvariant()

    # Replace symbols and spaces with hyphens
    $newName = $newName -replace '&', ' AND '
    $newName = $newName -replace '\+', ' PLUS '
    $newName = $newName -replace '[()]', ''
    $newName = $newName -replace '[^A-Z0-9]+', '-'
    $newName = $newName.Trim('-')

    # Handle duplicate product names
    if ($nameCount.ContainsKey($newName)) {
        $nameCount[$newName]++
        $finalName = "$newName-$($nameCount[$newName]).png"
    }
    else {
        $nameCount[$newName] = 1
        $finalName = "$newName.png"
    }

    $oldName = "product$number.png"
    $oldFile = Join-Path $imageFolder $oldName
    $newFile = Join-Path $imageFolder $finalName

    $renameList += [PSCustomObject]@{
        Number = $number
        Product = $productName
        OldName = $oldName
        NewName = $finalName
        OldFile = $oldFile
        NewFile = $newFile
    }
}

# ============================================
# PREVIEW
# ============================================

Write-Host "`n========== IMAGE RENAME PREVIEW ==========" -ForegroundColor Cyan

foreach ($item in $renameList) {
    if (Test-Path -LiteralPath $item.OldFile) {
        Write-Host "$($item.OldName) -> $($item.NewName)" -ForegroundColor Green
    }
    else {
        Write-Host "MISSING: $($item.OldName)" -ForegroundColor Red
    }
}

Write-Host "`nProducts in mapping: $($renameList.Count)" -ForegroundColor Cyan

if ($renameList.Count -ne 30) {
    Write-Host "Warning: 30 products nahi mile. Pehle JS mapping check karein." -ForegroundColor Yellow
    pause
    exit
}

# Check all source images exist before renaming
$missing = @($renameList | Where-Object { !(Test-Path -LiteralPath $_.OldFile) })

if ($missing.Count -gt 0) {
    Write-Host "`nKuch source images missing hain. Koi rename nahi ki gayi." -ForegroundColor Red
    pause
    exit
}

# Prevent overwriting unrelated existing images
$conflicts = @($renameList | Where-Object {
    (Test-Path -LiteralPath $_.NewFile) -and
    ($_.OldFile -ne $_.NewFile) -and
    ($renameList.OldFile -notcontains $_.NewFile)
})

if ($conflicts.Count -gt 0) {
    Write-Host "`nTarget filename pehle se maujood hai:" -ForegroundColor Red
    $conflicts | ForEach-Object { Write-Host $_.NewName -ForegroundColor Yellow }
    Write-Host "Conflict resolve karke script dobara run karein."
    pause
    exit
}

$confirm = Read-Host "`nRename images AND update JS paths? Type YES"

if ($confirm -cne "YES") {
    Write-Host "Cancelled. Koi change nahi kiya." -ForegroundColor Yellow
    pause
    exit
}

# ============================================
# STEP 1: Rename all source images to temp names
# ============================================

$tempList = @()

try {
    foreach ($item in $renameList) {
        $tempName = "__TEMP_PRODUCT_$($item.Number)_$([guid]::NewGuid().ToString('N')).png"
        $tempFile = Join-Path $imageFolder $tempName

        Rename-Item -LiteralPath $item.OldFile -NewName $tempName -ErrorAction Stop

        $tempList += [PSCustomObject]@{
            TempFile = $tempFile
            NewName = $item.NewName
            Number = $item.Number
        }
    }

    # ============================================
    # STEP 2: Temp names to final names
    # ============================================

    foreach ($item in $tempList) {
        Rename-Item -LiteralPath $item.TempFile -NewName $item.NewName -ErrorAction Stop
    }

    # ============================================
    # STEP 3: Update JS image paths
    # ============================================

    $updatedContent = $content

    foreach ($item in $renameList) {
        $oldPath = 'img/' + $item.OldName
        $newPath = 'img/' + $item.NewName
        $updatedContent = $updatedContent.Replace($oldPath, $newPath)
    }

    # Backup JS before changing it
    $backupFile = "$jsFile.bak"
    Copy-Item -LiteralPath $jsFile -Destination $backupFile -Force -ErrorAction Stop

    Set-Content -LiteralPath $jsFile -Value $updatedContent -Encoding UTF8 -ErrorAction Stop

    Write-Host "`n============================================" -ForegroundColor Green
    Write-Host "RENAME COMPLETE!" -ForegroundColor Green
    Write-Host "Product images renamed and JS paths updated." -ForegroundColor Green
    Write-Host "JS backup saved: $backupFile" -ForegroundColor Cyan
    Write-Host "============================================" -ForegroundColor Green
}
catch {
    Write-Host "`nERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please inspect the img folder and JS backup before retrying." -ForegroundColor Yellow
}

pause