<template>
  <div class="profile-settings">
    <h3>Cài đặt người dùng</h3>
    <form>
      <div>
        <label>Ngôn ngữ:</label>
        <select>
          <option>Tiếng Việt</option>
          <option>English</option>
        </select>
      </div>
      <div>
        <label>Thông báo email:</label>
        <input type="checkbox" checked />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfileSettings'
}
</script>
