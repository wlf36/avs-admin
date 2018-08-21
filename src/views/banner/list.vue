<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="Banner名称">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="Status" width="110" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status=='publish'" size="mini" type="success">publish</el-button>
                    <el-button v-if="scope.row.status=='draft'" size="mini">draft</el-button>
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
            <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="`/banner/${scope.row.id}`">
                        <el-button type="success" size="mini">添加/查看</el-button>
                    </router-link>
                    <router-link :to="`/banner/edit/${scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteBanner(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {
        fetchBanners,
        removeBanner
    } from '@/api/banner'

    export default {
        name: 'bannerList',
        data() {
            return {
                list: null,
                listLoading: true
            }
        },
        created() {
            this.getList()
        },
        methods: {
            deleteBanner(id) {
                console.log(id)
                removeBanner(id).then((response) => {
                    console.log(response)
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
                fetchBanners().then(response => {
                    console.log(response.data)
                    this.list = response.data
                    this.listLoading = false
                })
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
