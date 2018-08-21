<template>
    <div class="app-container">
        <tree-table :data="category" :columns="columns" :expandAll="true" border>
            <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="`/vocabulary/${vocabulary_id}/category/${scope.row.id}/create`">
                        <el-button type="success" size="mini">添加子分类</el-button>
                    </router-link>
                    <router-link :to="`/vocabulary/category/${scope.row.id}/edit`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteCategory(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </tree-table>
        <div style="margin-top:30px;">
            <router-link :to="`/vocabulary/${vocabulary_id}/category/0/create`">
                <el-button type="success" size="mini">添加顶级分类</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {
        fetchVocabulary
    } from '@/api/vocabulary'
    import {
        removeCategory
    } from '@/api/category'
    import treeTable from '@/components/TreeTable'

    export default {
        name: 'categoryList',
        components: {
            treeTable
        },
        data() {
            return {
                columns: [{
                        text: '分类名称',
                        value: 'name'
                    },
                    {
                        text: '描述',
                        value: 'description'
                    },
                    {
                        text: 'ID',
                        value: 'id',
                        width: 95
                    },
                    {
                        text: '创建时间',
                        value: 'created_at',
                        width: 180
                    },
                    {
                        text: '修改时间',
                        value: 'updated_at',
                        width: 180
                    }
                ],
                vocabulary_id: 1,
                category: [],
                listLoading: true
            }
        },
        created: function () {
            this.vocabulary_id = this.$route.params && this.$route.params.id;
            this.getList()
        },
        methods: {
            deleteCategory(id) {
                removeCategory(id).then((response) => {
                    this.$notify({
                        title: "删除成功",
                        message: response.message,
                        type: "success",
                        duration: 2000
                    });
                    this.getList()
                })
            },

            getList() {
                this.listLoading = true
                const id = this.$route.params && this.$route.params.id;
                fetchVocabulary(id).then(response => {
                    this.category = response.data.category
                    console.log(this.category)
                    this.listLoading = false
                })
            },

            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            }
        }
    }

</script>

<style scoped>
    .app_container {
        position: relative;
    }

    .pagination-container {
        margin-top: 30px;
    }

    .edit-input {
        padding-right: 100px;
    }

    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }

</style>
