<template>
    <el-card>
        <el-row>
            <el-col :offset="23" :span="1">
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delQuizItem()"></el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="Question / Enoncé">
                    <el-input size="mini" type="textarea" v-model="question" placeholder="Saissisez votre énoncé/question ici."></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="Points">
                    <el-input-number size="mini" v-model.number="point" :min="0" :max="5"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <div v-if="type === 'multichoice'" v-for="response in courseQuizItemsResponses" :key="id" style="background-color:#F5F5FF; border: 1px solid #ccc; padding: 5px;margin-bottom:5px;border-radius:5px;">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-form-item>
                        <el-input size="mini" v-model="response.response" autofocus placeholder="Saisissez une réponse ici."></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-switch v-model="response.isRight" active-text="Vrai" inactive-text="Faux"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delQuizItemResponse(response)"></el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input size="mini" type="textarea" v-model="response.note" autofocus></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div v-if="type === 'singlechoice'" v-for="response in courseQuizItemsResponses" :key="id">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-form-item>
                        <el-input size="mini" v-model="response.response" autofocus placeholder="Saisissez une réponse ici."></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-switch v-model="response.isRight" active-text="Vrai" inactive-text="Faux" @change="switchOthersToNo(response.counter)"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delQuizItemResponse(response)"></el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input size="mini" type="textarea" v-model="response.note" autofocus></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div v-if="type === 'text'" v-for="response in courseQuizItemsResponses" :key="counter">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item>
                        <el-input size="mini" v-model="response.response" autofocus placeholder="Saisissez une réponse ici."></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input size="mini" type="textarea" v-model="response.note" placeholder="Saisissez une note sur votre reponse ici."></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div v-if="type === 'code'" v-for="response in courseQuizItemsResponses" :key="id">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item>
                        <codemirror v-model="response.response" :options="cmOptions"></codemirror>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input type="textarea" v-model="response.note" placeholder="Saisissez votre reponse ici."></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <el-row v-if="type === 'multichoice' || type === 'singlechoice'">
            <el-col :span="24">
                <el-form-item>
                    <!-- <el-input-number size="mini" v-model.number="responseNumber" :min="savedResponseNumber" :max="5"></el-input-number> -->
                    <el-button size="mini" type="warning" icon="el-icon-plus" plain @click="addResponse()"> Ajouter une response</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
  export default {
    name: 'course-setup-quiz-item',
    data () {
      return {
            /*
            type: '',
            seq: 0, // Les plus petits apparaissent en premier
            question:'',
            responseNumber: 1, // 1 minimum
            savedResponseNumber: 1 // tjr <= responseNumber; permet de ne pas diminuer responseNumber en dessous des reponses sauvegardées dans la db
            courseQuizItemsResponses:[
                {
                    id: null,
                    seq: 0,
                    response: '',
                    isRight: true,
                    note: ''
                }
            ]
            point: 0,
            */
        counter: 0,
        cmOptions: {
                // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'cobalt',
          lineNumbers: true,
          line: true
                // more codemirror options, 更多 codemirror 的高级配置...
        }
      }
    },
    props: {
        // username: { default() { return '' } },
        // profile: { default() { return {} } }// body data
      id: null,
      type: { type: String, default: 'text' },
        // seq:{ type: Number, default: 1 }, // Les plus petits apparaissent en premier
      counter: { type: Number, default: 1 },
      question: { type: String, default: '' },
      responseNumber: { type: Number, default: 1 }, // 1 minimum
      savedResponseNumber: { type: Number, default: 1 }, // tjr <= responseNumber; permet de ne pas diminuer responseNumber en dessous des reponses sauvegardées dans la db
      courseQuizItemsResponses: {type: Array, default: () => []}, // { type: Array, default: function () { return [] } },
        /*
        [
            {
                id: null,
                seq: 0,
                response: '',
                isRight: true,
                note: ''
            }
        ]
        */
      point: 0
    },
    /*
    beforeCreate() {
        var cnt = 1
        this.courseQuizItemsResponses.forEach(response => { response.counter =  cnt++ })
    },
    */
    created () {
      var cnt = 1
      this.courseQuizItemsResponses.forEach(response => { response.counter = cnt++ })
      this.counter = this.courseQuizItemsResponses.length
    },
    mounted () {
        // this.counter = this.courseQuizItemsResponses.length
        // alert(typeof this.courseQuizItemsResponses)
    },
    beforeDestroy () {
      this.courseQuizItemsResponses.forEach(response => { delete response.counter })
    },
    methods: {
      switchOthersToNo (cnt) {
            // alert(cnt)
            // empeche de passer un true à false
  
        this.courseQuizItemsResponses.forEach(response => {
          if (response.counter === cnt && response.isRight === false) {
            response.isRight = true
          }
        })
            // bascule les autres à false
        this.courseQuizItemsResponses.forEach(response => {
          if (response.counter !== cnt) {
            response.isRight = false
          }
        })
      },
      delQuizItem () {
        this.$confirm('Voulez-vous réellement supprimer cette question?', 'Attention', {
          confirmButtonText: 'Oui, je veux la supprimer',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
          this.$emit('deleteQuizItem', {counter: this.counter})
        }).catch(() => {
  
        })
      },
      delQuizItemResponse (resp) {
        this.$confirm('Voulez-vous réellement supprimer cette reponse?', 'Attention', {
          confirmButtonText: 'Oui, je veux la supprimer',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
                // alert(JSON.stringify(resp))
          this.$emit('deleteQuizItemResponse', {responseCounter: resp.counter})
        }).catch(() => {
  
        })
      },
      addResponse () {
            // alert(courseQuizItemsResponses.length)
        this.counter++
  
        this.$emit('addResponse', { itemSeq: this.seq, counter: this.counter })
            /*
            this.$nextTick(function () {
                console.log(this.$el.textContent) // => 'mis à jour'
            })
            *
            this.courseQuizItemsResponses = Object.assign({}, this.courseQuizItemsResponses, {
                    id: null,
                    counter: this.counter,
                    seq: 0,
                    response: '',
                    isRight: false,
                    note: ''
                })
            *
            // this.$nextTick(function () {
                this.courseQuizItemsResponses.push({
                    id: null,
                    counter: this.counter,
                    seq: 0,
                    response: '',
                    isRight: false,
                    note: ''
                })
            // })
            this.$nextTick(function () {
                alert("Ajout d'une reponse")
                console.log("Ajout d'une reponse") // => 'mis à jour'
            })
            */
            // alert(this.counter)
      }
    }

  }
</script>

<style scoped>
.el-card {
    background-color: #F6F6F6;
    margin-bottom: 20px;
}
.el-form-item {
    margin-bottom: 0px;
}
</style>
