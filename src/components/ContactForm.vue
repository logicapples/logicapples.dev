<!-- @format -->

<template>
  <div class="contact">
    <h1>Contact me</h1>
    <form action="/contact/send" @submit.prevent="sendEmail">
      <label>Email</label><br />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        id="email" />
      <br />
      <label>Your Message</label><br />
      <input
        type="text"
        name="text"
        placeholder="Enter your message"
        id="text" />
      <br />
      <button type="submit" id="send-button">Send</button>
    </form>
  </div>
</template>

<script>
  export default {
    methods: {
      sendEmail() {
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#text").value;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8393/contact/send");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
          if (xhr.status === 200) {
            alert("Email sent successfully");
          } else {
            alert("Failed to send email");
          }
        };
        xhr.onerror = () => {
          alert("Network error");
        };
        xhr.send(JSON.stringify({ email, message }));
      },
    },
  };
</script>
