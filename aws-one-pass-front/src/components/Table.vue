<template>
  <q-card flat bordered class v-if="columns.length > 0">
    <q-card-section>
      <q-table
        v-model:pagination="pagination"
        :rows="data"
        row-key="name"
        :filter="filter"
        @request="onRequest"
        :hide-pagination="hidePagination"
      >
        <template v-slot:no-data="{ filter }">
          <div class="full-width row flex-center text-red q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              {{
                filter
                  ? `No se logró encontrar información con el filtro ${filter}`
                  : "No encontramos información."
              }}
            </span>
          </div>
        </template>
        <template>
          <div class="row q-gutter-md q-pt-md">
            <q-input
              v-if="!hideSearch"
              dense
              borderless
              debounce="300"
              v-model="filter"
              outlined
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="column in columns" :key="column.name" :props="props">
              {{ props.row[column.name] }}
            </q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                @click="$emit('edit', props.row)"
                round
                dense
                push
                color="blue"
                icon="edit"
              />
              <q-btn
                @click="$emit('delete', props.row)"
                round
                dense
                push
                color="red"
                icon="delete"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "TableComponent",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      default: [],
      required: true,
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    hideOptions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filter: "",
      pagination: {
        page: 1,
        rowsPerPage: 50,
      },
    };
  },
  watch: {
    filter() {
      this.onRequest();
    },
  },
  methods: {
    onRequest(props) {
      const { page, rowsPerPage } = props ? props.pagination : this.pagination;
      this.$emit("request", { page, rowsPerPage, filter: this.filter });
    },
    onRowClick(evt, row) {
      this.$emit("rowClick", row);
    },
    downloadFile(url) {
      window.open(url);
    },
  },
};
</script>
