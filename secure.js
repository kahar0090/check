const sheetURL = "https://opensheet.elk.sh/17u3zkXEZujsR9sFOjiPYj4PxqDfowXvPpv7S_-2m4DQ/Sheet1";

    function getPath() {
      return window.location.pathname.replace(/^\//, "").split("/")[0];
    }

    fetch(sheetURL)
      .then(res => res.json())
      .then(data => {
        const path = getPath();
        const entry = data.find(row => row.route === path);
        if (entry) {
          document.getElementById("companyName").innerText = entry.title || "Untitled";
          document.getElementById("description").innerText = entry.description || "";
          document.getElementById("logo").src = entry.logoURL || "default-logo.png";
          document.body.style.backgroundImage = `url('${entry.bgImageURL}')`;

          const btnDiv = document.getElementById("buttons");

          for (let i = 1; i <= 4; i++) {
            const text = entry[`button${i}Text`];
            const link = entry[`button${i}Link`];
            const icon = entry[`button${i}Icon`];

            if (text && link && icon) {
              const a = document.createElement("a");
              a.href = link;
              a.className = `link-button ${i === 1 ? 'shake' : ''}`;
              a.onclick = () => a.classList.add('clicked');

              const img = document.createElement("img");
              img.src = icon;
              img.className = "link-icon";
              a.appendChild(img);
              a.appendChild(document.createTextNode(text));
              btnDiv.appendChild(a);
            }
          }
        } else {
          document.getElementById("companyName").innerText = "Page Not Found";
        }
      })
      .catch(err => {
        console.error("Error fetching data", err);
        document.getElementById("companyName").innerText = "Error loading";
      });

    function toggleShare() {
      const popup = document.getElementById("sharePopup");
      popup.style.display = popup.style.display === "block" ? "none" : "block";
    }

    function copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
      });
    }

    function sharePage() {
      const shareData = {
        title: document.title,
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(err => console.log("Share failed:", err));
      } else {
        copyLink();
      }
    }

