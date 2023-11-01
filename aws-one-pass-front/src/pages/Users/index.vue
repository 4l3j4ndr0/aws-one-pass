<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">{{ titlePage }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="$router.push('/users/create')"
          color="primary"
          label="Create user"
          no-caps
          icon="add"
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <Table
        @request="
          ({ page, rowsPerPage, filter }) => getUsers(page, rowsPerPage, filter)
        "
        @edit="(user) => router.push('/users/edit/' + user.id)"
        @delete="(user) => deleteUsers(user)"
        :columns="columns"
        :data="users"
      ></Table>
    </q-card>
  </q-layout>
</template>
<script>
import Table from "../../components/Table.vue";
import mixin from "../../mixins/mixin";
import { useUserStore } from "../../stores/User";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  name: "Users",
  components: {
    Table,
  },
  setup() {
    const $q = useQuasar();
    const { showLoading, hideLoading, showNoty } = mixin();
    const titlePage = ref("Manage users");
    const router = useRouter();
    const user = useUserStore();

    const users = computed(() => {
      return useUserStore().users;
    });

    const columns = ref([
      { name: "id", label: "Id", field: "id" },
      { name: "programa", label: "Programa", field: "programa" },
      { name: "ciclo", label: "Ciclo", field: "ciclo" },
      { name: "asignatura", label: "Asignatura", field: "asignatura" },
      { name: "Créditos", label: "creditos", field: "creditos" },
    ]);

    const getUsers = (page = 1, rowsPerPage = 50, filter = null) => {
      showLoading("Getting users...");
      user
        .getUsers(page, rowsPerPage, filter)
        .then((response) => {
          hideLoading();
        })
        .catch((error) => {
          showNoty("error", error.message);
          hideLoading();
        });
    };

    onMounted(() => {
      getUsers();
    });

    const deleteUsers = (element) => {
      $q.dialog({
        title: "Eliminar asignatura",
        message: `Esta seguro de querer eliminar la asignatura ${element.asignatura}?`,
        cancel: {
          label: "Cancelar",
          color: "blue",
        },
        ok: {
          label: "Eliminar",
          color: "red",
          push: true,
        },
        persistent: true,
      })
        .onOk(() => {
          showLoading("Eliminando asignatura...");
          asignatura
            .deleteAsignatura(element.id)
            .then((response) => {
              hideLoading();
              showNoty("success", response.data.message);
              getAsignaturas();
            })
            .catch((error) => {
              hideLoading();
              showNoty("error", "Ocurrió un error al eliminar la asignatura.");
            });
        })
        .onCancel(() => {});
    };

    return {
      router,
      columns,
      getUsers,
      deleteUsers,
      user,
      users,
      titlePage,
    };
  },
};
</script>
