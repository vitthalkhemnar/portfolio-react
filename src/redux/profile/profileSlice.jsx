import { createSlice } from "@reduxjs/toolkit";
import { dataService } from "../../services/dataService";

const initialData = dataService.loadData();

const initialState = {
  ...initialData.profile,
  companies: initialData.companies || [],
  projects: initialData.projects || []
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFullData: (state, action) => {
      const { profile, companies, projects } = action.payload;
      if (profile) Object.assign(state, profile);
      if (companies) state.companies = companies;
      if (projects) state.projects = projects;
    },

    setProfile: (state, action) => {
      Object.assign(state, action.payload);
      dataService.updateProfile(action.payload);
    },

    updateProfileField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
      dataService.updateProfile({ [key]: value });
    },

    setSkillCategories: (state, action) => {
      state.skillCategories = action.payload;
      const flatSkills = action.payload.flatMap((cat) => cat.skills || []);
      state.skills = flatSkills;
      dataService.updateProfile({
        skillCategories: action.payload,
        skills: flatSkills
      });
    },

    // Projects CRUD
    setProjects: (state, action) => {
      state.projects = action.payload;
      dataService.updateProjects(action.payload);
    },
    addProject: (state, action) => {
      state.projects.unshift(action.payload);
      dataService.updateProjects(state.projects);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        dataService.updateProjects(state.projects);
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      dataService.updateProjects(state.projects);
    },

    // Companies CRUD
    setCompanies: (state, action) => {
      state.companies = action.payload;
      dataService.updateCompanies(action.payload);
    },
    addCompany: (state, action) => {
      state.companies.unshift(action.payload);
      dataService.updateCompanies(state.companies);
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
        dataService.updateCompanies(state.companies);
      }
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter((c) => c.id !== action.payload);
      dataService.updateCompanies(state.companies);
    }
  }
});

export const {
  setFullData,
  setProfile,
  updateProfileField,
  setSkillCategories,
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} = profileSlice.actions;

export default profileSlice.reducer;
