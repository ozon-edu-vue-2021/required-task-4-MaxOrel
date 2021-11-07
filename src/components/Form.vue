<template>
  <form autocomplete="off" class="form">
    <div class="row">{{ formData }}</div>
    <fieldset class="row">
      <legend class="form__title">Личные данные</legend>
      <div class="col">
        <label class="form__label" for="surname">Фамилия</label>
        <input
          class="form__input"
          id="surname"
          type="text"
          v-model="formData.surname"
        />
      </div>
      <div class="col">
        <label class="form__label" for="name">Имя</label>
        <input
          class="form__input"
          id="name"
          type="text"
          v-model="formData.name"
        />
      </div>
      <div class="col">
        <label class="form__label" for="patronymic">Отчество</label>
        <input
          class="form__input"
          id="patronymic"
          type="text"
          v-model="formData.patronymic"
        />
      </div>
      <div class="col col_width_m">
        <label class="form__label" for="date">Дата рождения</label>
        <input
          class="form__input"
          id="date"
          type="date"
          v-model="formData.date"
        />
      </div>
      <div class="col col_width_m">
        <label class="form__label" for="email">E-mail</label>
        <input
          class="form__input"
          id="email"
          type="email"
          v-model="formData.email"
        />
      </div>
    </fieldset>

    <fieldset class="row row_type_inline">
      <legend class="form__title">Пол</legend>
      <div class="col col_type_row">
        <input
          class="form__radio"
          id="male"
          type="radio"
          name="gender"
          value="Мужской"
          v-model="formData.gender"
        />
        <label class="form__label" for="male">Мужской</label>
      </div>
      <div class="col col_type_row">
        <input
          class="form__radio"
          id="female"
          type="radio"
          name="gender"
          value="Женский"
          v-model="formData.gender"
        />
        <label class="form__label" for="female">Женский</label>
      </div>
    </fieldset>

    <fieldset class="row">
      <legend class="form__title">Паспортные данные</legend>
      <div class="col" v-click-outside="hideDropdown">
        <label class="form__label" for="nationality">Гражданство</label>
        <input
          class="form__input"
          id="nationality"
          type="text"
          @focus="isDropdownOpen = true"
          v-model="searchText"
        />

        <div v-if="isDropdownOpen" class="nationality__dropdown">
          <ul v-if="filteredSkills.length">
            <li
              v-for="nationality in filteredSkills"
              :key="nationality.id"
              @click="onNationalityClick(nationality)"
            >
              {{ nationality.nationality }}
            </li>
          </ul>
          <div v-else class="empty">Ничего не найдено</div>
        </div>
      </div>
      <div class="col">
        <label class="form__label" for="series-doc">Серия паспорта</label>
        <input
          class="form__input"
          id="series-doc"
          type="number"
          v-model="formData.seriesDoc"
        />
      </div>
      <div class="col">
        <label class="form__label" for="number-doc">Номер паспорта</label>
        <input
          class="form__input"
          id="number-doc"
          type="number"
          v-model="formData.numberDoc"
        />
      </div>
      <div class="col">
        <label class="form__label" for="date-issue">Дата выдачи</label>
        <input
          class="form__input"
          id="date-issue"
          type="date"
          v-model="formData.dateIssue"
        />
      </div>
    </fieldset>

    <fieldset class="row row_type_inline">
      <legend class="form__title">Меняли ли фамилия или имя</legend>
      <div class="col col_type_row">
        <input
          class="form__radio"
          id="yes"
          type="radio"
          value="Да"
          name="name-change"
          v-model="formData.nameChange"
        />
        <label class="form__label" for="yes">Да</label>
      </div>
      <div class="col col_type_row">
        <input
          class="form__radio"
          id="no"
          type="radio"
          value="Нет"
          name="name-change"
          v-model="formData.nameChange"
        />
        <label class="form__label" for="no">Нет</label>
      </div>
    </fieldset>
    <div class="row">
      <div class="col">
        <label class="form__label" for="surname-female">Фамилия</label>
        <input
          class="form__input"
          id="surname-female"
          type="text"
          v-model="formData.surname"
        />
      </div>
      <div class="col">
        <label class="form__label" for="name-female">Имя</label>
        <input
          class="form__input"
          id="name-female"
          type="text"
          v-model="formData.name"
        />
      </div>
    </div>
    <div class="row">
      <button class="form__button button" type="submit">Отправить</button>
    </div>
  </form>
</template>

<script>
import ClickOutside from "vue-click-outside";
import nationality from "../assets/data/citizenships.json";

export default {
  data() {
    return {
      formData: {
        surname: "",
        name: "",
        patronymic: "",
        date: "",
        email: "",
        gender: "",
        seriesDoc: "",
        numberDoc: "",
        dateIssue: "",
        nameChange: false,
        nationality: [],
      },
      isDropdownOpen: false,
      allNationality: nationality,
      searchText: "",
    };
  },
  methods: {
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    onNationalityClick(selectedNationality) {
      if (!this.isNationalitySelected(selectedNationality)) {
        this.formData.nationality.push(selectedNationality);
        this.hideDropdown();
      }
    },
    isNationalitySelected(selectedNationality) {
      return !!this.formData.nationality.find(
        (nationality) =>
          nationality.id === selectedNationality.id ||
          nationality.nationality === selectedNationality.nationality
      );
    },
    getNationality(searchWord) {
      console.log(searchWord)
    },
  },
  watch: {
    searchText(newValue){
      this.getNationality(newValue)
    },
  },
  directives: {
    ClickOutside,
  },
  computed: {
    filteredSkills() {
      return this.allNationality.filter((currentElement) => !this.isNationalitySelected(currentElement)
      );
    },
  },
};
</script>
<style>
:root {
  --gap: 20px;
}
</style>
<style scoped>
.form {
}
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap);
  border: none;
  margin-bottom: 40px;
}
.row_type_inline {
  width: max-content;
}
.col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.col_width_m {
  flex-basis: calc(50% - var(--gap));
  flex-shrink: 0;
}

.col_type_row {
  flex-direction: row;
  align-items: center;
}

.form__label {
  display: block;
}
.form__input {
  background-color: transparent;
  border: 1px solid #ccc;
  box-shadow: none;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
}

.form__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.button {
  background-color: #cccccc;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
}

.form__button {
  margin-left: auto;
}
</style>
