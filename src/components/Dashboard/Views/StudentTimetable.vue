<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                <div class="card-header">
                    <h4 class="card-title">{{ title }}</h4>
                    <p class="category">{{ subTitle }}</p>
                </div>
                    <full-calendar :events="fcEvents"
                        first-day='1' locale="fr"
                        @changeMonth="changeMonth"
                        @eventClick="eventClick"
                        @dayClick="dayClick"
                        @moreClick="moreClick">
                        <template slot="fc-event-card" slot-scope="p">
                            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
                        </template>
                    </full-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  // import PaperTable from '@/components/UIComponents/PaperTable.vue'
  // const tableColumns = ['Id', 'Name', 'Salary', 'Country', 'City']
var demoEvents = [
    {
      title: 'Sunny 725-727',
      start: '2018-02-25',
      end: '2018-02-27',
      cssClass: 'family'
    },
    {
      title: 'Lunfel 726-727',
      start: '2018-02-26',
      end: '2018-02-27',
      cssClass: ['home', 'work']
    },
    {
      title: 'Lunfel 2/27-2/28',
      start: '2018-02-27',
      end: '2018-02-28'
    },
    {
      title: 'Lunfel 2/27-2/28',
      start: '2018-02-27',
      end: '2018-02-28'
    },
    {
      title: 'Lunfel 2/27-2/28',
      start: '2018-02-27',
      end: '2018-02-28'
    },
    {
      title: 'Lunfel 2/26-3/05',
      start: '2018-02-26',
      end: '2018-03-05'
    },
    {
      title: 'Lunfel 1/27-1/28',
      start: '2018-01-27',
      end: '2018-01-28'
    },
    {
      title: 'Lunfel 1/27-2/2',
      start: '2018-01-27',
      end: '2018-02-02'
    },
    {
      title: 'Lunfel 3/27-3/28',
      start: '2018-03-27',
      end: '2018-03-28'
    }
  ]

export default {
    data () {
      return {
        title: 'Emploi du temps',
        subTitle: 'subtitle',
        fcEvents: demoEvents
      }
    },
    methods: {
      'changeMonth' (start, end, current) {
        console.log('changeMonth', start.format(), end.format(), current.format())
      },
      'eventClick' (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      'dayClick' (day, jsEvent) {
        console.log('dayClick', day, jsEvent)
      },
      'moreClick' (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
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
