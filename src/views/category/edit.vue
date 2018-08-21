<template>
    <category-detail :is-edit='true'></category-detail>
</template>

<script>
    import CategoryDetail from './components/CategoryDetail'

    export default {
        name: 'editCategory',
        components: {
            CategoryDetail
        }
    }

</script>
