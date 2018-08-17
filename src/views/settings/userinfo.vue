<template>
  <div class="app-container">
        <h2>User Info</h2>

        

    </div>
</template>

<script>
import { fetchUserInfo } from '@/api/user'
export default {
    data() {
        return {
            user: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            fetchUserInfo().then((response) => {
                this.user = response.data
                console.log(response.data)
            })
        }
    }
}
</script>

