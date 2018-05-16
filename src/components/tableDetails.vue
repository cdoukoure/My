<template>
    
    <div id="details">
        
        <section>
            <el-button-group>
                <el-button type="primary" plain v-show="!editMode" icon="el-icon-edit" @click="editTable">Edit</el-button>
                <el-button type="info" plain v-show="!editMode" icon="el-icon-tickets" @click="listTable">Show List</el-button>
            </el-button-group>
            
            <el-button-group>
                <el-button type="primary" plain v-show="editMode" icon="el-icon-download" @click="saveTable">Save</el-button>
                <el-button type="info" plain v-show="editMode" icon="el-icon-close" @click="editTable">Cancel</el-button>
            </el-button-group>
            
            <el-button-group>
                <el-button type="primary" icon="el-icon-view" @click="dialogFormVisible = true">Preview</el-button>
            </el-button-group>
        </section>
        <hr/>
        <section class="todoapp">
            
            <el-form ref="form" :label-position="right">
                
                <el-input type="hidden" v-model="selectedTable.id"></el-input>
                
                <header class="header">
                    <el-col :span="12">
                        <el-form-item label="Table name" prop="selectedTable.name">
                            <el-input v-model="selectedTable.name" :disabled="editMode == 0"></el-input>
                        </el-form-item>
                        <el-form-item label="Description" prop="selectedTable.description">
                            <el-input type="textarea" v-model="selectedTable.description" :disabled="editMode == 0"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form :model="newCol" ref="formColAdd" label-width="100px">
                            <el-row :gutter="20">
                                <el-col :span="9" :offset="3">
                                    <el-form-item label="Name" >
                                        <el-input v-model="newCol.name" autofocus :disabled="editMode == 0"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item label="Label" >
                                        <el-input v-model="newCol.label" :disabled="editMode == 0"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-top: 20px;">
                                <el-col :span="9" :offset="3">
                                    <el-form-item label="Type of data">
                                        <el-select v-model="newCol.type" placeholder="Select the field type according to your needs" size="large" :disabled="editMode == 0">
                                            <el-option label="Text zone" value="text"></el-option>
                                            <el-option label="Checkboxe (for many options with multi choices)" value="checkbox"></el-option>
                                            <el-option label="Text zone (for big text content)" value="textarea"></el-option>
                                            <el-option label="Radio button (for many options with single choice. Up to 3 options)" value="radio"></el-option>
                                            <el-option label="Select box (for many options with single choice. More than 3 options)" value="select"></el-option>
                                            <el-option label="Date (Calendar)" value="date"></el-option>
                                            <el-option label="Number" value="number"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item label="Options" >
                                        <el-input autosize type="textarea" v-model="newCol.options" :disabled="editMode == 0"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-top: 20px;">
                                <el-col :span="9" :offset="3">
                                    <el-form-item label="Nullable">
                                        <el-switch v-model="newCol.nullable" active-text="Can be null" inactive-text="Can not be null" :disabled="editMode == 0"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-top: 20px;">
                                <el-col :span="3" :offset="3">
                                    <el-form-item >
                                        <el-button
                                            @click="submitForm('')"
                                            type="primary"
                                            size="medium">
                                            Add
                                        </el-button>
                                        <el-button @click="resetForm('formColAdd')">Reset</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                    <el-form-item >
                                        <el-button
                                            @click="cancelEdit(props.row)"
                                            type="info"
                                            v-show="editMode"
                                            size="medium">
                                            Cancel
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        
                    </el-col>
                </header>
                
                <div class="content" v-show="editMode">
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="newCol.name" autofocus></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="newCol.label"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-select v-model="newCol.type" placeholder="Select the field type">
                                <el-option label="Text zone" value="text"></el-option>
                                <el-option label="Checkboxe (for many options with multi choices)" value="checkbox"></el-option>
                                <el-option label="Text zone (for big text content)" value="textarea"></el-option>
                                <el-option label="Radio button (for many options with single choice. Up to 3 options)" value="radio"></el-option>
                                <el-option label="Select box (for many options with single choice. More than 3 options)" value="select"></el-option>
                                <el-option label="Date (Calendar)" value="date"></el-option>
                                <el-option label="Number" value="number"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-input autosize type="textarea" v-model="newCol.options"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-switch v-model="newCol.nullable" active-text="Null" inactive-text="Not Null"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item >
                            <el-button
                                @click="addCol"
                                type="primary"
                                size="medium">
                                Add
                            </el-button>
                        </el-form-item>
                    </el-col>
                </div>
                
                <div>
                    <el-table
                        ref="columnTable"
                        :data="selectedTable.columns"
                        @expand-change="handleExpandChange"
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form-item prop="props.row">
                                    <el-row :gutter="20">
                                        <el-col :span="9" :offset="3">
                                            <el-form-item label="Name" >
                                                <el-input v-model="props.row.name" autofocus :disabled="editMode == 0"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="9">
                                            <el-form-item label="Label" >
                                                <el-input v-model="props.row.label" :disabled="editMode == 0"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-top: 20px;">
                                        <el-col :span="9" :offset="3">
                                            <el-form-item label="Type of data">
                                                <el-select v-model="props.row.type" placeholder="Select the field type according to your needs" size="large" :disabled="editMode == 0">
                                                    <el-option label="Text zone" value="text"></el-option>
                                                    <el-option label="Checkboxe (for many options with multi choices)" value="checkbox"></el-option>
                                                    <el-option label="Text zone (for big text content)" value="textarea"></el-option>
                                                    <el-option label="Radio button (for many options with single choice. Up to 3 options)" value="radio"></el-option>
                                                    <el-option label="Select box (for many options with single choice. More than 3 options)" value="select"></el-option>
                                                    <el-option label="Date (Calendar)" value="date"></el-option>
                                                    <el-option label="Number" value="number"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="9">
                                            <el-form-item label="Options" >
                                                <el-input autosize type="textarea" v-model="props.row.options" :disabled="editMode == 0"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-top: 20px;">
                                        <el-col :span="9" :offset="3">
                                            <el-form-item label="Nullable">
                                                <el-switch v-model="props.row.nullable" active-text="Can be null" inactive-text="Can not be null" :disabled="editMode == 0"></el-switch>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20" style="margin-top: 20px;">
                                        <el-col :span="3" :offset="3">
                                            <el-form-item >
                                                <el-button
                                                    type="primary"
                                                    v-show="editMode"
                                                    @click="saveCol(props.$index, props.row)"
                                                    size="medium">
                                                    Save
                                                </el-button>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="3">
                                            <el-form-item >
                                                <el-button
                                                    @click="cancelEdit(props.row)"
                                                    type="info"
                                                    v-show="editMode"
                                                    size="medium">
                                                    Cancel
                                                </el-button>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2" :push="9">
                                            <el-form-item >
                                                <el-button
                                                    @click="removeCol(props.row)"
                                                    type="danger"
                                                    size="medium">
                                                    Delete
                                                </el-button>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="Name"
                            align="left"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="Label"
                            align="left"
                            prop="label">
                        </el-table-column>
                        <el-table-column
                            label="Type"
                            align="left"
                            prop="type">
                        </el-table-column>
                        <el-table-column
                            label="Options"
                            align="left"
                            prop="options">
                        </el-table-column>
                        <el-table-column
                            label="Nullable"
                            prop="nullable">
                        </el-table-column>
                    </el-table>
                </div>
                
            </el-form>
            
        </section>
        
        <el-dialog :title="selectedTable.name" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item
                    v-for="(col, index) in selectedTable.columns"
                    v-bind:key="col.id"
                    v-bind:label="col.label">
                    <el-date-picker
                        v-if="col.type === 'date'"
                        type="date"
                        placeholder="Pick a day">
                    </el-date-picker>
                    <el-radio v-else-if="col.type === 'radio'" v-for="item in col.options.split(';')"
                        :key="item.substring(0, item.indexOf(':'))"
                        :label="item.substring(item.indexOf(':')+1)"
                        >
                        {{ item.substring(0, item.indexOf(':')) }}
                    </el-radio>
                    <el-checkbox-group v-else-if="col.type === 'checkbox'">
                        <el-checkbox
                            v-for="item in col.options.split(';')"
                            :key="item.substring(0, item.indexOf(':'))"
                            :label="item.substring(item.indexOf(':')+1)">
                            {{ item.substring(0, item.indexOf(':')) }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <el-select v-else-if="col.type === 'select'" placeholder="Select">
                        <el-option
                            v-for="item in col.options.split(';')"
                            :key="item.substring(0, item.indexOf(':'))"
                            :label="item.substring(item.indexOf(':')+1)"
                            :value="item.substring(0, item.indexOf(':'))">
                        </el-option>
                    </el-select>
                    <el-input-number v-else-if="col.type === 'number'" @change="handleChange" :min="1" :max="10000"></el-input-number>
                    <el-input v-else-if="col.type === 'textarea'" type="textarea"></el-input>
                    <el-input v-else="col.type === 'text'" placeholder="Please input"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">Close</el-button>
            </span>
        </el-dialog>
        
    </div>
    
</template>

<script>
    
    // import tableCol from './tableCol'
    // import simpleTableCol from './simpleTableCol'
    
    // Vue.directive('focus', { inserted(el) { el.focus() } })
    // Vue.directive('selected', { inserted(el) { el.select() } })
    
    export default {
      data () {
        return {
          selectedTable: null,
          newCol: {
            name: '',
            label: '',
            type: 'text',
            options: '',
            nullable: true,
            disable: false
          },
                // editedCol: null,
          beforeEditCache: null,
          deletedCol: [],
          loading: true,
          editMode: false,
          dialogFormVisible: false
                // for simple-table-col
    
        }
      },
      created () {
            // récupérer les données lorsque la vue est créée et
            // que les données sont déjà observées
            // this.fetchData()
        this.selectedTable = this.$store.getters.activatedTable
            // this.selectedTable.name = this.$store.getters.activatedTable.name
            // this.selectedTable.description = this.$store.getters.activatedTable.description
    
            // this.selectedTable.columns = this.$store.getters.activatedTable.columns
        if (this.selectedTable) {
          this.selectedTable.columns.forEach(column => {
            column.disable = true
          })
        } else {
          this.editMode = true
          this.selectedTable = {
            'id': null,
            'name': '',
            'description': '',
            'columns': []
          }
        }
    
        loading = false
      },
      beforeDestroy () {
        this.selectedTable.columns.forEach(column => { delete column.disable })
      },
        /*
         watch: {
         // appeler encore la méthode si la route change
         '$route': 'saveTable'
         },
        */
      beforeRouteLeave (to, from, next) {
            // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            // if (answer) {
            // this.saveTable()
            //    next()
            // } else {
            //    next(false)
            // }
    
        if (this.beforeEditCache !== null) {
          this.$confirm('Do you really want to leave?', 'Warning', {
            confirmButtonText: 'Quit wiyhout save',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
                            // this.saveTable()
            next()
          }).catch(() => {
            next(false)
          })
        }
    
        next()
      },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
      methods: {
        handleExpandChange (row, expandedRows) {
          if (expandedRows && expandedRows.length > 1) {
                    // alert(expandedRows.length)
                    // expandedRowser = expandedRows
    
            expandedRowser = expandedRows.splice(0, 1)
    
            alert(JSON.stringify(expandedRowser))
    
                    /*
                    expandedRows.forEach(expanded => {
                        if ( expanded !== row ) {
                            this.$refs.columnTable.toggleRowExpansion(expanded);
                        }
                    });
                    */
                    // this.$refs.columnTable.toggleRowExpansion(row);
          }
    
                // this.$refs.columnTable.toggleRowExpansion(row);
        },
        submitForm (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.selectedTable.columns.push({
                name: this.newCol.name.trim(),
                label: this.newCol.label.trim(),
                type: this.newCol.type.trim(),
                options: this.newCol.options.trim(),
                nullable: this.newCol.nullable,
                disable: true
              })
    
              this.newCol = {
                name: '',
                label: '',
                type: 'text',
                options: '',
                nullable: true,
                disable: true
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
        },
        addCol () {
                // var col = this.newCol
                // return
                // alert(JSON.stringify(this.newCol))
    
                /*
    
                 this.newCol.name = (this.newCol.name === typeof("string") ? this.newCol.name.trim() : '')
                 this.newCol.label =  (this.newCol.label === typeof("string") ? this.newCol.label.trim() : '')
                 this.newCol.type = (this.newCol.type === typeof("string") ? this.newCol.type.trim() : 'text')
                 this.newCol.options = (this.newCol.options === typeof("string") ? this.newCol.options.trim() : '')
                 this.newCol.nullable = (this.newCol.nullable === typeof(true) ? this.newCol.nullable : true)
    
                 if (this.newCol.name === '' && this.newCol.label === '') {
                 return
                 }
    
                 this.columns.push({
                 id: undefined,
                 name: (this.newCol.name === typeof("string") ? this.newCol.name.trim() : ''),
                 label: (this.newCol.label === typeof("string") ? this.newCol.label.trim() : ''),
                 type: (this.newCol.type === typeof("string") ? this.newCol.type.trim() : 'text'),
                 options: (this.newCol.options === typeof("string") ? this.newCol.options.trim() : ''),
                 nullable: (this.newCol.nullable === typeof(true) ? this.newCol.nullable : true),
                 disable: true
                 })
    
                 */
    
          this.selectedTable.columns.push({
            name: this.newCol.name.trim(),
            label: this.newCol.label.trim(),
            type: this.newCol.type.trim(),
            options: this.newCol.options.trim(),
            nullable: this.newCol.nullable,
            disable: true
          })
    
          this.newCol = {
            name: '',
            label: '',
            type: 'text',
            options: '',
            nullable: true,
            disable: true
          }
        },
    
        removeCol (col) {
                /*
                 if (typeof col.id === 'number') {
                 this.deletedCol.push(col.id)
                 }
                 */
                // alert(this.selectedTable.columns.indexOf(col))
                // this.selectedTable.columns.splice(this.columns.indexOf(col), 1)
          this.$confirm('Do you really want to delete this column?', 'Warning', {
            confirmButtonText: 'Yes, I want to delete this column',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
                            // this.saveTable()
            alert(this.selectedTable.columns.indexOf(col))
                            // this.selectedTable.columns.splice(this.columns.indexOf(col), 1)
          }).catch(() => {
    
          })
        },
    
        editCol (colObject) {
          this.beforeEditCache = {
            name: colObject.name,
            label: colObject.label,
            type: colObject.type,
            options: colObject.options,
            nullable: colObject.nullabel,
            disable: true
          }
                // this.beforeEditCache = colObject
                // this.editedCol = colObject
          colObject.disable = false
                // alert(JSON.stringify(colObject))
        },
    
        doneEditCol (colObject) {
                /*
                 if (!this.editedCol) {
                 return
                 }
    
                 this.editedCol = null
    
                 colObject.id = (colObject.name === typeof(1234) ? colObject.id : null)
                 colObject.name = (colObject.name === typeof('string') ? colObject.name.trim() : '')
                 colObject.label = (colObject.label === typeof('string') ? colObject.label.trim() : '')
                 colObject.type = (colObject.type === typeof('string') ? colObject.type.trim() : 'text')
                 colObject.options = (colObject.options === typeof('string') ? colObject.options.trim() : '')
                 colObject.nullable = (colObject.nullable === typeof(true) ? colObject.nullable : true)
    
                 if (!colObject.name | !colObject.label) {
                 this.removeCol(colObject)
                 }
                */
          colObject.disable = true
          this.beforeEditCache = null
        },
    
        cancelEditCol (colObject) {
                // this.editedCol = null
          colObject = this.beforeEditCache
          colObject.disable = true
          this.beforeEditCache = null
        },
    
        editTable () {
          this.editMode = !this.editMode
        },
    
        saveTable () {
          this.selectedTable.columns.forEach(column => {
            delete column.disable
          })
               // alert(JSON.stringify(this.selectedTable))
          if (this.selectedTable.id === null) {
            delete this.selectedTable.id
                   // alert(JSON.stringify(this.selectedTable))
                   // return
            this.$store.dispatch('addTable', this.selectedTable)
          } else {
                   // let rowId = this.selectedTable.id
                   // alert(JSON.stringify(this.selectedTable))
                   // return
            this.$store.dispatch('updateTable', this.selectedTable)
          }
    
          this.beforeEditCache = null
          this.editMode = false
    
               // Reinit selectedTable to new one
          this.selectedTable = this.$store.getters.activatedTable
    
          this.selectedTable.columns.forEach(column => {
            column.disable = true
          })
        },
    
        listTable () {
          this.$router.push({ name: 'List'})
        }
    
      },
        // a custom directive to wait for the DOM to be updated
        // before focusing on the input field.
        // http://vuejs.org/guide/custom-directive.html
      directives: {
        'col-focus': function (el, binding) {
          if (binding.value) {
            el.focus()
          }
        }
      }
    }
</script>

<style>
#details {
    background-color: #fff;
    padding: 20px;
},
hr {
    border-color: #ccc;
}

.el-form-item__label {
    font-weight: bold;
    line-height: 30px;
}
.el-select {
    display: block;
}
.el-select .el-input__icon {
    height: 50%;
    position: relative;
    top: 45%;
}
</style>
