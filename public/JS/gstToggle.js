
    let taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click", function() {
        let taxInfo = document.querySelectorAll(".tax-info");
        if (this.checked) {
            taxInfo.forEach(function(info) {
                info.style.display = "inline";
            });
        } else {
            taxInfo.forEach(function(info) {
                info.style.display = "none";
            });
        }
    });
