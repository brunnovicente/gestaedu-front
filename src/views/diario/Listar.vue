<script setup>


import {onMounted, ref} from "vue";

  let diarios = ref([]);
  let professor = ref({});
  let siape = ref('');
  let msg = ref('')

  async function listar(siape){
    try{
      msg.value = ''
      diarios.value = []
      professor.value = {}

      let requisicao = await fetch('http://localhost:3000/diario/listar/'+siape);
      let dados = await requisicao.json();

      if(requisicao.status === 404){
        msg.value = dados.message;
      }else{
        diarios.value = dados.diarios;
        professor.value = dados.professor
      }

    }catch(error){
      console.log('ERRO: '+error);
    }
  }
</script>

<template>
  <div class="col-md-8 p-2 mx-auto mb-3">
    <div class="border border-1 p-3 bg-light my-3">
      <p class="text-danger text-center h5">
        Registre suas permutas de aulas.
      </p>
    </div>

    <div class="row">
      <div class="col-sm">
        <form @submit.prevent="listar(siape)">
          <label>DIGITE O SEU SIAPE AQUI E PRESSIONE ENTER</label>
          <input class="form-control my-2 w-25" name="siape" v-model="siape">
        </form>
      </div>
    </div>

    <div v-if="msg" class="alert alert-danger">
      <strong>AVISO!</strong> {{ msg }}
    </div>

    <div v-if="Object.keys(professor).length" class="bg-light my-3 py-2 px-1 d-flex justify-content-between">
      <h5>Prof. {{professor.nome}}</h5>
    </div>

    <table v-if="Object.keys(professor).length" class="table table-striped">
      <thead>
        <tr>
          <th>CURSO</th>
          <th>TURMA</th>
          <th>DIÁRIO</th>
          <th>ANO</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="diario in diarios">
          <td>{{diario.turma.curso.descricao}}</td>
          <td>{{diario.turma.descricao}}</td>
          <td>{{diario.descricao}}</td>
          <td>{{diario.turma.calendario.ano}}.{{diario.turma.calendario.semestre}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>