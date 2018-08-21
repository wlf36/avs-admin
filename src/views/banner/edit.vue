<template>
    <banner-detail :is-edit='true'></banner-detail>
</template>

<script>
    import BannerDetail from "./components/BannerDetail";

    export default {
        name: "editBanner",
        components: {
            BannerDetail
        }
    };

</script>
