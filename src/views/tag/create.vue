<template>
    <tag-detail :is-edit='false'></tag-detail>
</template>

<script>
    import TagDetail from './components/TagDetail'

    export default {
        name: 'createTag',
        components: {
            TagDetail
        }
    }

</script>
