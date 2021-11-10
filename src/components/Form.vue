<template>
  <v-form ref="form" v-model="valid" class="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Личные данные</h2>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.lastname"
            :rules="nameRuRules"
            label="Фамилия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.firstname"
            :rules="nameRuRules"
            label="Имя"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.patronymic"
            :rules="nameRuRules"
            label="Отчество"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-show="menu"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.date"
                label="Дата рождения"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.date"
              :active-picker.sync="activePicker"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.email"
            :rules="emailRules"
            label="E-mail"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Пол</h3>
          <v-radio-group v-model="formData.gender" row>
            <v-radio label="Мужской" value="male"></v-radio>
            <v-radio label="Женский" value="female"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2>Поспортные данные</h2>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            hide-no-data
            :search-input.sync="search"
            :loading="isLoading"
            width="290"
            v-model="formData.nationalitySelected"
            :items="nationality"
            item-text="nationality"
            outlined
            label="Гражданство"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" v-if="isRussia">
          <v-text-field
            v-model="formData.seriesDoc"
            maxlength="4"
            :rules="seriesDocRules"
            label="Серия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="isRussia">
          <v-text-field
            v-model="formData.numberDoc"
            maxlength="6"
            :rules="numberDocRules"
            label="Номер"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="isRussia">
          <v-menu
            v-model="dateIssueMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formData.dateIssue"
                label="Дата выдачи"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="formData.dateIssue"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              @input="dateIssueMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6" v-if="isNotRussia">
          <v-text-field
            v-model="formData.lastnameEn"
            :rules="nameEnRules"
            label="Фамилия на латинице"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" v-if="isNotRussia">
          <v-text-field
            v-model="formData.firstnameEn"
            :rules="nameEnRules"
            label="Имя на латинице"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="isNotRussia">
          <v-text-field
            v-model="formData.numberDocEn"
            label="Номер"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="isNotRussia">
          <v-autocomplete
            width="290"
            v-model="formData.cuntryIssue"
            :items="nationality"
            item-text="nationality"
            outlined
            label="Страна выдачи"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" v-if="isNotRussia">
          <v-autocomplete
            width="290"
            v-model="formData.typePassportSelected"
            :items="typePassport"
            item-text="type"
            outlined
            label="Гражданство"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Меняли ли фамилию или имя?</h3>
          <v-radio-group v-model="formData.changeName" row>
            <v-radio label="Нет" :value="false"></v-radio>
            <v-radio label="Да" :value="true"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row v-if="formData.changeName">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.lastnameChange"
            :rules="nameRuRules"
            label="Фамилия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="formData.nameChange"
            :rules="nameRuRules"
            label="Имя"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="success" class="mr-4" @click="validate"> Отправить </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Очистить </v-btn>
    </v-container>
  </v-form>
</template>
<script>
import nationality from "../assets/data/citizenships.json";
import typePassport from "../assets/data/passport-types.json";
import debounced from "../helper/debounce";

export default {
  data: () => ({
    formData: {
      firstname: "",
      lastname: "",
      firstnameEn: "",
      lastnameEn: "",
      patronymic: "",
      date: null,
      gender: null,
      seriesDoc: "",
      numberDoc: "",
      numberDocEn: "",
      cuntryIssue: null,
      dateIssue: null,
      changeName: false,
      lastnameChange: "",
      nameChange: "",
      nationalitySelected: null,
      email: "",
      typePassportSelected: null,
    },
    search: null,
    isLoading: false,
    menu: false,
    dateIssueMenu: false,
    activePicker: null,
    valid: false,
    nameRuRules: [
      (v) => !!v || "Поле обязательно",
      (v) => /^[А-ЯЁа-яё-]+$/.test(v) || "Введите только русские символы",
    ],
    nameEnRules: [
      (v) => !!v || "Поле обязательно",
      (v) => /^[A-Za-z-]+$/.test(v) || "Введите только латинские символы",
    ],
    seriesDocRules: [
      (v) => !!v || "E-mail обязателен",
      (v) =>
        /^\d+$/.test(v) ||
        "Введите корректную серию паспорта, разрешен ввод только цифр",
    ],
    numberDocRules: [
      (v) => !!v || "E-mail обязателен",
      (v) =>
        /^\d+$/.test(v) ||
        "Введите корректный номер паспорта, разрешен ввод только цифр",
    ],
    nationality: nationality,
    typePassport: typePassport,
    emailRules: [
      (v) => !!v || "E-mail обязателен",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail не валиден",
    ],
  }),
  created() {
    this.fetchDebounced = debounced(this.fetchApiTest, 1000);
  },
  computed: {
    isRussia() {
      return (
        this.formData.nationalitySelected &&
        this.formData.nationalitySelected === "Russia"
      );
    },
    isNotRussia() {
      return (
        this.formData.nationalitySelected &&
        this.formData.nationalitySelected !== "Russia"
      );
    },
  },
  watch: {
    search(val) {
      if (!val) {
        return;
      }
      this.isLoading = true;
      this.fetchDebounced(this.search);
    },
  },
  methods: {
    fetchApiTest(data) {
      console.log("SEND_API_REQUEST", data);
      this.isLoading = false;
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log("SENS_FORM_DATA_REQUEST", this.formData);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
