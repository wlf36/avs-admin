<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="词汇表名称">
                <template slot-scope="scope">
                    <router-link :to="`/vocabulary/${scope.row.id}`">{{scope.row.name}}</router-link>
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" width="180" align="center">
                <template slot-scope="scope">
                    {{scope.row.updated_at}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="`/vocabulary/${scope.row.id}`">
                        <el-button type="success" size="mini">添加/查看</el-button>
                    </router-link>
                    <router-link :to="`/vocabulary/edit/${scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteVocabulary(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @current-change="handleCurrentChange" :current-page="listQuery.page" :page-size="listQuery.limit"
                layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        fetchVocabularies,
        removeVocabulary
    } from '@/api/vocabulary'

    export default {
        name: 'vocabularyList',
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            deleteVocabulary(id) {
                removeVocabulary(id).then((response) => {
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
                fetchVocabularies(this.listQuery).then(response => {
                    this.list = response.data.data
                    this.total = response.data.total
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
