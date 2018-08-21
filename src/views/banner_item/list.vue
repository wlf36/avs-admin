<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="项目名称">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="项目描述">
                <template slot-scope="scope">
                    {{scope.row.description}}
                </template>
            </el-table-column>
            <el-table-column label="banner_id">
                <template slot-scope="scope">
                    {{scope.row.banner_id}}
                </template>
            </el-table-column>
            <el-table-column label="image_id">
                <template slot-scope="scope">
                    {{scope.row.image_id}}
                </template>
            </el-table-column>
            <el-table-column label="url_id">
                <template slot-scope="scope">
                    {{scope.row.url_id}}
                </template>
            </el-table-column>
            <el-table-column label="url_type">
                <template slot-scope="scope">
                    {{scope.row.url_type}}
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
                    <router-link :to="`/banner/${banner_id}/banneritem/edit/${scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                    <el-button size="mini" type="danger" @click="deleteBannerItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:30px;">
            <router-link :to="`/banner/${banner_id}/create`">
                <el-button type="success" size="mini">添加项目</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {
        fetchBannerItems,
        removeBannerItem
    } from '@/api/bannerItem'

    export default {
        name: 'bannerItemList',
        data() {
            return {
                list: null,
                listLoading: true,
                banner_id: 0
            }
        },
        created() {
            const id = this.$route.params && this.$route.params.banner_id;
            this.banner_id = id
            this.getList(id)
        },
        methods: {
            deleteBannerItem(id) {
                console.log(id)
                removeBannerItem(id).then((response) => {
                    console.log(response)
                    this.$notify({
                        title: "删除成功",
                        message: response.message,
                        type: "success",
                        duration: 2000
                    });
                    this.getList(this.banner_id)
                })
            },

            getList(id) {
                this.listLoading = true
                fetchBannerItems(id).then(response => {
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
