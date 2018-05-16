<template>
    <div>
        <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="~examples/assets/images/hamburger.png" class="image"/>
                    <div style="padding: 14px;">
                        <span>Yummy hamburger</span>
                        <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                                <el-button type="text" class="button">Operating button</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  // import PaperTable from '@/components/UIComponents/PaperTable.vue'
  // const tableColumns = ['Id', 'Name', 'Salary', 'Country', 'City']

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
