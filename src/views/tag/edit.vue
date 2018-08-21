<template>
    <tag-detail :is-edit='true'></tag-detail>
</template>

<script>
    import TagDetail from './components/TagDetail'

    export default {
        name: 'editTag',
        components: {
            TagDetail
        }
    }

</script>
