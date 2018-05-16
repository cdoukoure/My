<template>
    <div >
        <data-tables-server :data="data" :total="total" :loading="loading" @query-change="queryChange" :action-col-def="actionColDef" :actions-def="actionsDef" :table-props="tableProps">
            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
            </el-table-column>
        </data-tables-server>
    </div>
</template>

<script>

export default {
  data () {
    return {
      data: [],
      titles: [{
        prop: 'id',
        label: 'NO.'
      }, {
        prop: 'name',
        label: 'Name'
      }, {
        prop: 'description',
        label: 'Description'
      }],
      total: 0,
      loading: false,
      actionsDef: {
        colProps: {
          span: 3
        },
        def: [{
          name: 'New',
          handler: () => {
            this.$store.dispatch('resetActivatedTable')
            this.$router.push({ name: 'New'})
          },
          icon: 'el-icon-circle-plus'
        }]
      },
      actionColDef: {
        label: 'Actions',
        tableColProps: {
          align: 'center'
        },
        def: [{
          handler: row => {
            // this.$message('Edit clicked ' + row.id)
            let rowId = row.id
            this.$store.dispatch('selectTable', rowId)
            this.$router.push({ name: 'Details', params: { rowId }})
            // this.$message('RUA in row clicked ' + row.flow_no)
          },
          buttonProps: {
            type: 'primary'
          },
          name: 'Edit'
        }]
      },
      tableProps: {
        height: 450,
        defaultSort: {
          prop: 'id',
          order: 'descending'
        }
      }
    }
  },
  created () {
    this.$store.dispatch('loadTables')

    this.loadData({
      page: 1,
      pageSize: 10
    })
  },
  methods: {
    loadData (res) {
      let datas = this.$store.getters.tables.slice()
      let allKeys = Object.keys(this.$store.getters.tables[0])
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
</style>