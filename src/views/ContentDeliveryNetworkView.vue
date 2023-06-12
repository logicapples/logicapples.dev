<!-- @format -->

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
  const api_endpoint = "/api/cdn";

  export default {
    mounted() {
      document.querySelector(".navspace").style.visibility = "visible";
      document.querySelector(".navspace").style.animation =
        "navbarMovement .8s";
      document.querySelector(".app").style.animation = "changeBg 1s forwards";
      document.querySelector("footer").style.display = "flex";
      document.querySelector(".navpfp").style.visibility = "visible";

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

      function dragleave(e) {
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
        source = await new EventSource(`${api_endpoint}/upload`);

        source.addEventListener("message", e => {
          console.log(JSON.parse(e.data));
          disabled = true;
          const { bytesExpected, bytesReceived, percentage, isDone } = JSON.parse(
            e.data
          );
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
          ).innerHTML = `Your file has been uploaded!\n<a class="smallink" href="${api_endpoint}/files/${filename}" target="_blank">${filename}</a>`;
          document.querySelector(".fileText").innerHTML = "File not selected";
          document.querySelector(".progress").style.opacity = "0.2";
          document.getElementById("fileinput").value = "";
        }, 1000);
      },
    },
  };
</script>
