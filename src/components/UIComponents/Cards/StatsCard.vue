<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <slot name="header"></slot>
        </div>
        <div class="col-xs-7">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="footer">
        <hr/>
        <slot name="footer"></slot>
      </div>
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'stats-card'
  }
</script>

<style>
 .card {
    border: 0;
    border-radius: 0.1875rem;
    display: inline-block;
    position: relative;
    width: 100%;
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
</style>
