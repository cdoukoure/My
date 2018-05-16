import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
import axios from 'axios'
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function mockData (query) {
  query = purify(query)
  const { limit = 10, offset = 0, sort = '', order = '' } = query

  // let rows = this.$store.dispatch('loadRisks')
  let rows = []
  axios.get('http://127.0.0.1:8000/risks_backend/')
      .then(response => {
        rows = response.data.data
        // response.data.data
      })
      .catch(e => alert(e))

  alert(sort)
  /* custom query conditions
  ['id', 'name', 'description'].forEach(field => {
    switch (typeOf(query[field])) {
      case 'array':
        rows = rows.filter(row => query[field].includes(row[field]))
        break
      case 'string':
        rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
        break
      default:
        // nothing to do
        break
    }
  }) */

  if (sort) {
    rows = orderBy(rows, sort, order)
  }

  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length
  }

  const consoleGroupName = 'Mock data - ' + moment().format('YYYY-MM-DD HH:mm:ss')

  setTimeout(() => {
    console.group(consoleGroupName)
    console.info('Receive:', query)
    console.info('Respond:', res)
    console.groupEnd(consoleGroupName)
  }, 0)

  return Promise.resolve(purify(res))
}

let mockServer = function (res) {
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

  const resus = {
    data: datas.slice((res.page - 1) * res.pageSize, res.page * res.pageSize),
    req: res,
    ts: new Date(),
    total: datas.length
  }

  return Promise.resolve(resus).reject('network error')
}
