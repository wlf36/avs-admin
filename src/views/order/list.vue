<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="订单号">
                <template slot-scope="scope">
                    {{scope.row.order_no}}
                </template>
            </el-table-column>
            <el-table-column label="订单商品">
                <template slot-scope="scope">
                    <span v-for="(product, index) in scope.row.product" :key="index">
                        {{product.title}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="总价格" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.total_price}}
                </template>
            </el-table-column>

            <el-table-column label="商品数量" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.total_count}}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="订单状态" width="100" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status==2" size="mini" type="success">已付款</el-button>
                    <el-button v-if="scope.row.status==1" size="mini">未付款</el-button>
                </template>
            </el-table-column>
            <el-table-column label="收货人">
                <template slot-scope="scope">
                    {{scope.row.snap_address.userName}}
                </template>
            </el-table-column>
            <el-table-column label="手机号" width="110">
                <template slot-scope="scope">
                    {{scope.row.snap_address.telNumber}}
                </template>
            </el-table-column>
            <el-table-column label="邮编">
                <template slot-scope="scope">
                    {{scope.row.snap_address.postalCode}}
                </template>
            </el-table-column>
            <el-table-column label="收货地址" width="220">
                <template slot-scope="scope">
                    {{scope.row.snap_address.provinceName}}{{scope.row.snap_address.cityName}}{{scope.row.snap_address.countyName}}{{scope.row.snap_address.detailInfo}}
                </template>
            </el-table-column>

            <el-table-column label="创建时间" width="160" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.created_at}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.updated_at}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="`/order/edit/${scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
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
        fetchOrders
    } from '@/api/order'

    export default {
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
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            getList() {
                this.listLoading = true
                fetchOrders(this.listQuery).then(response => {
                    console.log(response.data.data)
                    response.data.data.map((item) => {
                        item.snap_address = JSON.parse(item.snap_address)
                    })

                    this.list = response.data.data
                    this.total = response.data.total
                    this.listLoading = false
                })
            }
        }
    }

</script>

<style scoped>
    .pagination-container {
        margin-top: 30px;
    }

</style>
