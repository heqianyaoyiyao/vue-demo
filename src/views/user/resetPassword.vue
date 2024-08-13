<template>
  <div class="reset-password">
    <h1>Reset Password</h1>
    <form @submit.prevent="submitNewPassword">
      <div>
        <label for="newPassword">New Password:</label>
        <input
          type="password"
          v-model="newPassword"
          id="newPassword"
          required
        />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ResetPassword',
  setup() {
    const route = useRoute();
    const newPassword = ref('');
    const confirmPassword = ref('');
    const error = ref(null);
    const message = ref(null);

    const submitNewPassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        error.value = 'Passwords do not match';
        return;
      }

      try {
        const token = route.params.token; // 从URL中获取重置密码的token
        const response = await axios.post(`/user/resetPassword/${token}`, {
          newPassword: newPassword.value,
        });

        message.value = response.data.message;
      } catch (err) {
        if (err.response) {
          error.value = err.response.data.message;
        } else {
          error.value = 'An error occurred';
        }
      }
    };

    return {
      newPassword,
      confirmPassword,
      submitNewPassword,
      error,
      message,
    };
  },
};
</script>

<style scoped>
.reset-password {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
form div {
  margin-bottom: 15px;
}
form label {
  display: block;
  margin-bottom: 5px;
}
form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
form button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
form button:hover {
  background-color: #0056b3;
}
p {
  margin-top: 10px;
  color: red;
}
</style>
