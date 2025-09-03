<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiFetch } from '../../services/http.js';
import { setToken } from '../../services/auth.js';

const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const loading  = ref(false);
const erro     = ref('');

async function entrar() {
  erro.value = '';
  loading.value = true;
  try {
    // Ajuste os campos conforme sua API
    const data = await apiFetch('/usuario/login', {
      method: 'POST',
      body: JSON.stringify({ username: username.value, password: password.value }),
    });
    console.log(data)

    //if (!data?.token) throw new Error('Token ausente na resposta.');
    setToken(data);

    // (opcional) guardar o usuário
    // localStorage.setItem('user', JSON.stringify(data.user));

    const redirectTo = (route.query.redirect ?? '/principal');
    router.replace(redirectTo);
  } catch (e) {
    erro.value = e?.message || 'Falha no login';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="row m-0">
    <div class="col-md-3 mx-auto">
      <div class="card mt-2">
        <div>
          <a href="/permuta/listar">
            <img src="../../assets/batman.png" class="w-25 my-2 d-block mx-auto">
          </a>
          <h5 class="text-center">Acesso ao Sistema</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="entrar">
            <label for="username">MATRÍCULA</label>
            <input v-model="username" type="text" id="username" name="username" class="form-control" required>
            <label for="password">SENHA</label>
            <input v-model="password" type="password" id="password" name="password" class="form-control" required>
            <button :disabled="loading" class="btn btn-dark mt-2 w-100">{{ loading ? 'Entrando…' : 'Entrar' }}</button>
          </form>
          <p v-if="erro" class="erro">{{ erro }}</p>
          <a href="/usuario/codigo" class="btn btn-default d-block mt-2">Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  </div>
</template>