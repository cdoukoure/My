<template>
    <tr @dblclick="$emit('edit')" @keyup.enter="$emit('doneEdit')" @keyup.esc="$emit('cancelEdit')">
        <td>
            <el-input v-model="column.name" autofocus v-show="!column.disable"></el-input>
            <span v-show="column.disable">{{ column.name }}</span>
            <el-input type="hidden" v-model="column.id"></el-input>
        </td>
        <td>
            <el-input v-model="column.label" v-show="!column.disable"></el-input>
            <span v-show="column.disable">{{ column.label }}</span>
        </td>
        <td>
            <el-select v-model="column.type" placeholder="Select the field type" v-show="!column.disable">
                <el-option label="Text zone" value="text"></el-option>
                <el-option label="Checkboxe (for many options with multi choices)" value="checkbox"></el-option>
                <el-option label="Text zone (for big text content)" value="textarea"></el-option>
                <el-option label="Radio button (for many options with single choice. Up to 3 options)" value="radio"></el-option>
                <el-option label="Select box (for many options with single choice. More than 3 options)" value="select"></el-option>
                <el-option label="Date (Calendar)" value="date"></el-option>
                <el-option label="Number" value="number"></el-option>
            </el-select>
            <span v-show="column.disable">{{ column.type }}</span>
        </td>
        <td>
            <el-input v-model="column.options" v-show="!column.disable"></el-input>
            <span v-show="column.disable">{{ column.options }}</span>
        </td>
        <td>
            <el-switch v-model="column.nullable" :disabled="column.disable"></el-switch>
        </td>
        <td>
            <el-button
                @click="$emit('remove')"
                type="warning"
                icon="el-icon-delete"
                >
            </el-button>
            <el-button
                v-show="column.disable"
                @click="$emit('edit')"
                type="primary"
                icon="el-icon-edit"
                >
            </el-button>
        </td>
    </tr>
</template>

<script>
  export default {
    props: ['column']
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>