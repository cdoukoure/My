<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <div class="card-header">
                        <h4 class="card-title">Paiement</h4>
                        <p class="category">{{ subTitle }}</p>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="Scolarité" name="first">
                            <data-tables-server :data="data" :total="total" :loading="loading" @query-change="queryChange" :action-col-def="actionColDef" :table-props="tableProps">
                                <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :key="column.prop" :width="column.width" ortable="custom">
                                </el-table-column>
                            </data-tables-server>
                        </el-tab-pane>
                        <el-tab-pane label="Souscription" name="second">
                            <data-tables-server :data="data" :total="total" :loading="loading" @query-change="queryChange" :action-col-def="actionColDef" :table-props="tableProps">
                                <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :key="column.prop" :width="column.width" ortable="custom">
                                </el-table-column>
                            </data-tables-server>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="E-Learning Store" name="third">Store</el-tab-pane> -->
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  // import PaperTable from '@/components/UIComponents/PaperTable.vue'
  // const tableColumns = ['Id', 'Name', 'Salary', 'Country', 'City']
  const tableData = [{
    id: 1,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 2,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 3,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 4,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 5,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }, {
    id: 6,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 7,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 8,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 9,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 10,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }, {
    id: 11,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 12,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 13,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 14,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 15,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }, {
    id: 16,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 17,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 18,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 19,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 20,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }, {
    id: 21,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 22,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 23,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 24,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 25,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }, {
    id: 26,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 27,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 28,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 29,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 30,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }]

export default {
  data () {
    return {
      data: [],
      title: 'Stripped Table',
      subTitle: 'Here is a subtitle for this table',
      columns: [
        {
          prop: 'id',
          label: 'NO.',
          width: '50px;'
        },
        {
          prop: 'name',
          label: 'Name',
          width: '200px;'
        },
        {
          prop: 'salary',
          label: 'Salary',
          width: '100px;'
        },
        {
          prop: 'country',
          label: 'Country',
          width: '150px;'
        },
        {
          prop: 'city',
          label: 'City',
          width: '370px;'
        }
      ],
      total: 0,
      loading: false,
      actionsDef: {
        colProps: {
          span: 3
        },
        def: [{
          name: 'New',
          handler: () => {
            // this.$store.dispatch('resetActivatedTable')
            // this.$router.push({ name: 'New'})
          },
          icon: 'el-icon-circle-plus'
        }]
      },
      actionColDef: {
        label: 'Action',
        tableColProps: {
          align: 'center',
          width: '150px'
        },
        def: [{
          handler: row => {
            // this.$message('Edit clicked ' + row.id)
            let rowId = row.id
            // this.$store.dispatch('selectTable', rowId)
            // this.$router.push({ name: 'Details', params: { rowId }})
            this.$message('RUA in row clicked ' + row.flow_no)
          },
          buttonProps: {
            type: 'primary',
            size: 'mini'
          },
          name: '',
          icon: 'el-icon-view'
        }, {
          handler: row => {
            // this.$message('Edit clicked ' + row.id)
            let rowId = row.id
            // this.$store.dispatch('selectTable', rowId)
            // this.$router.push({ name: 'Details', params: { rowId }})
            this.$message('RUA in row clicked ' + row.flow_no)
          },
          buttonProps: {
            type: 'danger',
            size: 'mini'
          },
          name: '',
          icon: 'el-icon-edit-outline'
        }]
      },
      tableProps: {
        height: 450,
        border: false,
        defaultSort: {
          prop: 'id',
          order: 'descending'
        }
      }
    }
  },
  created () {
    // this.$store.dispatch('loadTables')

    this.loadData({
      page: 1,
      pageSize: 10
    })
  },
  methods: {
    loadData (res) {
      // let datas = this.$store.getters.tables.slice()
      // let allKeys = Object.keys(this.$store.getters.tables[0])
      let datas = tableData.slice()
      let allKeys = Object.keys(tableData[0])

      // do filter
      res.filters && res.filters.forEach(filter => {
        datas = datas.filter(data => {
          let props = filter.props || allKeys
          return props.some(prop => {
            if (!filter.vals || filter.vals.length === 0) {
              return true
            }
            return filter.vals.some(val => {
              return data[prop].toString().toLowerCase().indexOf(val.toLowerCase()) > -1
            })
          })
        })
      })

        // do sort
      if (res.sortInfo && res.sortInfo.order) {
        let order = res.sortInfo.order
        let prop = res.sortInfo.prop
        let isDescending = order === 'descending'

        datas.sort(function (a, b) {
          if (a[prop] > b[prop]) {
            return 1
          } else if (a[prop] < b[prop]) {
            return -1
          } else {
            return 0
          }
        })
        if (isDescending) {
          datas.reverse()
        }
      }
        /*
        const resus = {
            data: datas.slice((res.page - 1) * res.pageSize, res.page * res.pageSize),
            req: res,
            ts: new Date(),
            total: datas.length
        }
        */
      this.data = datas.slice((res.page - 1) * res.pageSize, res.page * res.pageSize)
      this.total = datas.length
        // return Promise.resolve(resus).reject('network error')
    },
    queryChange (info) {
      this.loadData(info)
    }
  }
}
</script>

<style>

/*
.card {

    border: 0;
    border-radius: 0.1875rem;
    display: inline-block;
    position: relative;
    width: 96%;
    margin-bottom: 20px;
    -webkit-box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
    box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;

}
.card .card-header .card-title {
    margin-top: 10px;
}
.card-title {
    margin-bottom: .75rem;
}
*/
h4 + .category, h4.title + .category, .h4 + .category, .h4.title + .category {
    margin-top: -10px;
}
.category, .card-category {
    text-transform: capitalize;
    font-weight: 400;
    color: #9A9A9A;
    font-size: 0.7142em;
}
p {
    margin-bottom: 1rem;
}
.el-table td, .el-table th {
    padding: 5px 0;
}
</style>
