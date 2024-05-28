<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="showError" id="error">Username or Password is incorrect</p>
    </div>
  </div>
</template>
