<!-- @format -->

<style scoped>
a {
  text-decoration: none;
  font-size: 20px;
  transition: 0.3s;
  border-radius: 5px;
  color: white;
  padding: 0 10px;
}

.smallink {
  font-size: 13px;
  color: darkgreen;
  text-align: center;
}

a:hover {
  scale: 120%;
}

li {
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-direction: column;
}

.actual {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 6rem;
  margin-left: 15px;
}

.details {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  text-align: center;
}

.error {
  position: absolute;
  bottom: 70px;
  right: 30px;
  max-width: 290px;
  max-height: 150px;
  border-radius: 10px;
  background: #ff808a;
  color: black;
  display: none;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2004;
}

.fileSize {
  background: #000000;
  color: white;
}

.progress {
  opacity: 0.2;
}

.dropbox {
  width: 20rem;
  height: 200px;
  background-image: url("https://w7.pngwing.com/pngs/410/111/png-transparent-down-arrow-logo-arrow-down-android-down-arrow-hand-triangle-internet.png");
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-color: #ffffff;
  filter: invert(90%);
  border: black 3px dashed;
  transition: all 0.3s ease-out;
}

.dropbox:hover {
  cursor: pointer;
  border: red solid 1px;
}

.cdn {
  flex-direction: column;
  color: white;
}

.appc {
  display: flex;
  justify-content: space-around;
  height: 70vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
}

.cdnupload {
  width: 100px;
  height: 40px;
  background: #0f2021;
  color: white;
  border-radius: 10px;
  padding: 0 10px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

#fileinput {
  display: none;
}

.progressXbutton {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
}

.border {
  border: rgb(40, 40, 40) 1px solid;
  border-radius: 50px;
  width: 35rem;
}

.grey {
  border-radius: 50px;
  height: 24px;
  width: 0%;
  background: repeating-linear-gradient(
      -45deg,
      gray,
      gray 20px,
      black 20px,
      black 40px
    )
    300% 0/200% 400%;
  animation: a 10s linear infinite;
  transition: all 0.7s linear;
}

.cdnupload:hover {
  scale: 110%;
  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="file"]::file-selector-button {
  padding: 0;
  margin: 0;
}

.udetails {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="appc">
    <span class="fileSize error"></span>
    <div class="cdn flex">
      <div class="flex">
        <input type="file" name="file" id="fileinput" />
      </div>
      <span class="error"></span>
      <div class="dropbox"></div>
      <span class="fileText">File not selected</span>
    </div>
    <div class="progressXbutton">
      <div class="progress">
        <div class="udetails">
          <span class="bytesRecieved">0</span>
          <p>/</p>
          <span class="bytesExpected">0</span>
        </div>
        <div class="border">
          <div class="grey"></div>
        </div>
      </div>
      <div class="cdnupload" v-on:click="handleSubmit">
        <span class="uploadText">Upload</span>
      </div>
    </div>
  </div>
</template>

<script>
  let source,
    disabled = false,
    filename,
    done;
  const api_endpoint = "/api";

  export default {
    mounted() {
      document
        .getElementById("fileinput")
        .addEventListener("change", handleFiles, false);
      const dropbox = document.querySelector(".dropbox");
      dropbox.addEventListener("dragenter", dragenter, false);
      dropbox.addEventListener("dragover", dragover, false);
      dropbox.addEventListener("drop", drop, false);
      dropbox.addEventListener("dragleave", dragleave, false);
      dropbox.addEventListener("click", () =>
        document.getElementById("fileinput").click()
      );

      function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector(".dropbox").style.border = "red solid 1px";
      }

      function dragleave() {
        document.querySelector(".dropbox").style.border = "white solid 1px";
      }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer,
          files = dt.files;

        document.getElementById("fileinput").files = files;
        document.querySelector(".dropbox").style.border = "white solid 1px";

        handleFiles(files);
      }

      function handleFiles(files) {
        const fileList = this?.files || files;
        if (files) document.querySelector(".error").style.display = "flex";
        document.querySelector(".fileSize").innerHTML =
          "File size: " +
          Math.round((fileList[0].size * 0.000001 + Number.EPSILON) * 100) /
            100 +
          " Mb";
        document.querySelector(".fileText").innerHTML = fileList[0].name;
        filename = fileList[0].name;
      }
    },
    methods: {
      async handleSubmit(e) {
        if (disabled) return;
        e.preventDefault();
        const input = document.getElementById("fileinput");
        if (!input.files[0]) {
          document.querySelector(".error").innerHTML = "No Files Recieved";
          document.querySelector(".error").style.display = "flex";
          return setTimeout(() => {
            document.querySelector(".error").innerHTML = "";
            document.querySelector(".error").style.display = "none";
          }, 2000);
        }
        const formData = new FormData();
        formData.append(0, input.files[0]);
        source = new EventSource(`${api_endpoint}/sse`);

        source.addEventListener("message", e => {
          //console.log(e.data);
          //console.log(JSON.parse(e.data));
          disabled = true;
          const { bytesExpected, bytesReceived, percentage, isDone } =
            JSON.parse(e.data);
          done = isDone;
          document.querySelector(".bytesExpected").innerHTML =
            Math.round((bytesExpected * 0.000001 + Number.EPSILON) * 100) /
              100 +
            " MB";
          document.querySelector(".bytesRecieved").innerHTML =
            Math.round((bytesReceived * 0.000001 + Number.EPSILON) * 100) /
              100 +
            " MB";
          document.querySelector(".uploadText").innerHTML = percentage + "%";
          document.querySelector(".grey").style.width = percentage + "%";
        });

        document.querySelector(".fileSize").innerHTML = "Uploading...";
        document.querySelector(".progress").style.opacity = "1";

        const res = await fetch(`${api_endpoint}/upload`, {
          method: "POST",
          headers: {
            Accept: "*/*",
          },
          body: formData,
        });
        //const data = JSON.parse(await res.text());
        if (!res.ok) {
          console.log(data.error);
          document.querySelector(".error").innerHTML = data.error;
          document.querySelector(".error").style.display = "flex";
          setTimeout(() => {
            document.querySelector(".error").innerHTML = "";
            document.querySelector(".error").style.display = "none";
          }, 2000);
        }
        setTimeout(() => {
          source.close();
          disabled = false;
          document.querySelector(".bytesExpected").innerHTML = "0";
          document.querySelector(".bytesRecieved").innerHTML = "0";
          document.querySelector(".uploadText").innerHTML = "Upload";
          document.querySelector(".grey").style.width = "";
          document.querySelector(
            ".fileSize"
          ).innerHTML = `Your file has been uploaded!\n<a class="smallink" href="${api_endpoint}/cdn_files/${filename}" target="_blank">${filename}</a>`;
          document.querySelector(".fileText").innerHTML = "File not selected";
          document.querySelector(".progress").style.opacity = "0.2";
          document.getElementById("fileinput").value = "";
        }, 1000);
      },
    },
  };
</script>
