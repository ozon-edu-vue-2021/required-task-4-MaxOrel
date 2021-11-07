<template>
  <v-form v-model="valid" class="form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Личные данные</h2>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :rules="nameRuRules"
            :counter="10"
            label="Фамилия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :rules="nameRuRules"
            :counter="10"
            label="Имя"
            color="blue darken-2"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="patronymic"
            :rules="nameRuRules"
            :counter="10"
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
                v-model="date"
                label="Дата рождения"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
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
            v-model="email"
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
          <v-radio-group v-model="gender" row>
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
            width="290"
            v-model="nationality"
            :items="items"
            outlined
            label="Гражданство"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="seriesDoc"
            :rules="nameRuRules"
            :counter="10"
            label="Серия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="numberDoc"
            :rules="nameRuRules"
            :counter="10"
            label="Номер"
            color="blue darken-2"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
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
                v-model="dateIssue"
                label="Дата выдачи"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateIssue"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              @input="dateIssueMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Меняли ли фамилию или имя?</h3>
          <v-radio-group v-model="changeName" row>
            <v-radio label="Нет" :value="false"></v-radio>
            <v-radio label="Да" :value="true"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row v-if="changeName">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastnameChange"
            :rules="nameRuRules"
            label="Фамилия"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="nameChange"
            :rules="nameRuRules"
            label="Имя"
            required
            :validate-on-blur="true"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>


export default {
  data: () => ({
    menu: false,
    dateIssueMenu: false,
    activePicker: null,
    valid: false,
    firstname: "",
    lastname: "",
    patronymic: "",
    date: null,
    gender: null,
    seriesDoc: "",
    numberDoc: "",
    dateIssue: null,
    changeName: false,
    lastnameChange: "",
    nameChange: "",
    nationalitySelected: [],
    nationality: [],
    nameRuRules: [
      (v) => !!v || "Поле обязательно",
      (v) => /^[А-ЯЁа-яё-]+$/.test(v) || "Введите только русские символы",
    ],
    nameEnRules: [
      (v) => !!v || "Поле обязательно",
      (v) => /^[A-Za-z-]+$/.test(v) || "Введите только латинские символы",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail обязателен",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail не валиден",
    ],
  }),
};
</script>

<style scoped></style>
