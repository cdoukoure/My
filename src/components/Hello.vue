<template>
    <div class="wrapper">
        <el-container style="border: 1px solid #eee">
            <el-aside width="380px" style="padding: 15px;">
                
                <el-steps direction="vertical" :active="stepCounter" finish-status="success" class="step-menu">
                    <el-step title="Généralités" icon="el-icon-setting"></el-step>
                    <el-step title="INFRASTRUCTURES" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 2 && stepCounter <=3" title="Fondation"></el-step>
                    <el-step v-show="stepCounter >= 2 && stepCounter <=3" title="Construction de sous-sol"></el-step>
                    <el-step title="SUPERSTRUCTURE ET ENVELOPPE" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 5 && stepCounter <=7" title="Superstructure"></el-step>
                    <el-step v-show="stepCounter >= 5 && stepCounter <=7" title="Enveloppe extérieure"></el-step>
                    <el-step v-show="stepCounter >= 5 && stepCounter <=7" title="Toiture"></el-step>
                    <el-step title="AMENAGEMENT INTERIEUR" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 9 && stepCounter <=11" title="Construction intérieure"></el-step>
                    <el-step v-show="stepCounter >= 9 && stepCounter <=11" title="Escaliers"></el-step>
                    <el-step v-show="stepCounter >= 9 && stepCounter <=11" title="Finitions intérieures"></el-step>
                    <el-step title="SERVICES" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 13 && stepCounter <=17" title="Moyens de transport"></el-step>
                    <el-step v-show="stepCounter >= 13 && stepCounter <=17" title="Plomberie"></el-step>
                    <el-step v-show="stepCounter >= 13 && stepCounter <=17" title="CVCA" description="Chauffage, ventilation et conditionnement d'air"></el-step>
                    <el-step v-show="stepCounter >= 13 && stepCounter <=17" title="Protection incendie"></el-step>
                    <el-step v-show="stepCounter >= 13 && stepCounter <=17" title="Electricité"></el-step>
                    <el-step title="EQUIPEMENTS ET AMEUBLEMENT" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 19 && stepCounter <=20" title="Equipements"></el-step>
                    <el-step v-show="stepCounter >= 19 && stepCounter <=20" title="Ameublement et décoration"></el-step>
                    <el-step title="CONSTRUCTIONS SPECIALES ET DEMOLITION" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 22 && stepCounter <=23" title="Constructions spéciales"></el-step>
                    <el-step v-show="stepCounter >= 22 && stepCounter <=23" title="Démolition sélective de bâtiment"></el-step>
                    <el-step title="AMENAGEMENT D'EMPLACEMENT" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 25 && stepCounter <=30" title="Préparation d'emplacement"></el-step>
                    <el-step v-show="stepCounter >= 25 && stepCounter <=30" title="Amélioration d'emplacement"></el-step>
                    <el-step v-show="stepCounter >= 25 && stepCounter <=30" title="Service de mécanique sur l'emplacement"></el-step>
                    <el-step v-show="stepCounter >= 25 && stepCounter <=30" title="Services d'électricité sur l'emplacement"></el-step>
                    <el-step v-show="stepCounter >= 25 && stepCounter <=30" title="Autre construction sur l'emplacement"></el-step>
                    <el-step title="Mise en forme finale" icon="el-icon-document"></el-step>
                    <el-step title="Rapports" icon="el-icon-success"></el-step>
                </el-steps>
                <!--
                 <el-menu :default-openeds="['1', '2']" :default-active="activeMenu" active-text-color="#ffd04b">
                 <el-menu-item index="1">
                 <i class="el-icon-setting"></i>
                 <span>Généralité</span>
                 </el-menu-item>
                 <el-submenu index="2">
                 <template slot="title"><i class="el-icon-message"></i>Progession</template>
                 <el-menu-item-group>
                 <template slot="title">A - Infrastructure</template>
                 <el-menu-item index="2-1">A10 - Fondations</el-menu-item>
                 <el-menu-item index="2-2">A20 - Construction de sous-sol</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">B - Superstructure et Enveloppe</template>
                 <el-menu-item index="2-3">B10 - Superstructure</el-menu-item>
                 <el-menu-item index="2-4">B20 - Enveloppe extérieure</el-menu-item>
                 <el-menu-item index="2-5">B30 - Toiture</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">C - Aménagement intérieur</template>
                 <el-menu-item index="2-6">C10 - Construction intérieure</el-menu-item>
                 <el-menu-item index="2-7">C20 - Escaliers</el-menu-item>
                 <el-menu-item index="2-8">C30 - Finitions intérieures</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">D - Services</template>
                 <el-menu-item index="2-9">D10 - Moyens de transport</el-menu-item>
                 <el-menu-item index="2-10">D20 - Plomberie</el-menu-item>
                 <el-menu-item index="2-11">D30 - Chauffage, Ventilation et conditionnement d'air</el-menu-item>
                 <el-menu-item index="2-12">D40 - Protection incendie</el-menu-item>
                 <el-menu-item index="2-13">D50 - Electricité</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">E - Equipements et ameublements</template>
                 <el-menu-item index="2-14">E10 - Equipements</el-menu-item>
                 <el-menu-item index="2-15">E20 - Ameublements</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">F - Constructions spéciales et démolition</template>
                 <el-menu-item index="2-16">E10 - Equipements</el-menu-item>
                 <el-menu-item index="2-17">E20 - Ameublements</el-menu-item>
                 </el-menu-item-group>
                 <el-menu-item-group>
                 <template slot="title">G - Aménagement d'emplacement</template>
                 <el-menu-item index="2-18">G10 - Préparation d'emplacement'</el-menu-item>
                 <el-menu-item index="2-19">G20 - Amélioration d'emplacement'</el-menu-item>
                 <el-menu-item index="2-20">G30 - Service de mécanique sur l'emplacement</el-menu-item>
                 <el-menu-item index="2-21">G40 - Service d'électricité sur l'emplacement</el-menu-item>
                 <el-menu-item index="2-22">G90 - Autre construction sur l'emplacement</el-menu-item>
                 </el-menu-item-group>
                 </el-submenu>
                 <el-menu-item index="3">
                 <i class="el-icon-setting"></i>
                 <span>Documentation</span>
                 </el-menu-item>
                 </el-menu>
                 -->
            </el-aside>
            <el-container>
                <el-header>
                    <!--
                     <p> {{ stepCounter }}</p>
                     <p> {{ stepMenu }}</p>
                     -->
                    <h2 v-show="stepCounter === 0" style="text-align:center">G&Eacute;N&Eacute;RALIT&Eacute;S</h2>
                    <h2 v-show="stepCounter >= 2 && stepCounter <= 3" style="text-align:center">INFRASTURES</h2>
                    <h2 v-show="stepCounter >= 4 && stepCounter <= 7" style="text-align:center">SUPERSTRUCTURE ET ENVELOPPE</h2>
                    <h2 v-show="stepCounter >= 8 && stepCounter <= 11"  style="text-align:center">AM&Eacute;NAGEMENT INT&Eacute;RIEUR</h2>
                    <h2 v-show="stepCounter >= 12 && stepCounter <= 17" style="text-align:center">SERVICES</h2>
                    <h2 v-show="stepCounter >= 18 && stepCounter <= 20" style="text-align:center">&Eacute;QUIPEMENTS ET AMEUBLEMENT</h2>
                    <h2 v-show="stepCounter >= 21 && stepCounter <= 23"  style="text-align:center">CONSTRUCTIONS SP&Eacute;CIALES ET D&Eacute;MOLITION</h2>
                    <h2 v-show="stepCounter >= 24 && stepCounter <= 29" style="text-align:center">AM&Eacute;NAGEMENT D'EMPLACEMENT</h2>
                    <h2 v-show="stepCounter === 30" style="text-align:center">AUTRES INFORMATIONS</h2>
                    <h2 v-show="stepCounter === 31" style="text-align:center">RAPPORTS</h2>
                </el-header>
                <el-main>
                    <!-- STEP -->
                    <el-row :gutter="20" class="steps-group">
                        <el-col :span="18" :offset="3">
                            
                            <el-steps v-show="stepCounter >= 2 && stepCounter <= 3" :active="active" finish-status="success" align-center>
                                <el-step title="Fondation"></el-step>
                                <el-step title="Construction de sous-sol"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 5 && stepCounter <= 7" :active="active" finish-status="success" align-center>
                                <el-step title="Superstructure"></el-step>
                                <el-step title="Enveloppe extérieure"></el-step>
                                <el-step title="Toiture"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 9 && stepCounter <= 11" :active="active" finish-status="success" align-center>
                                <el-step title="Construction intérieure"></el-step>
                                <el-step title="Escaliers"></el-step>
                                <el-step title="Finitions intérieures"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 13 && stepCounter <= 17" :active="active" finish-status="success" align-center>
                                <el-step title="Moyens de transport"></el-step>
                                <el-step title="Plomberie"></el-step>
                                <el-step title="CVCA"></el-step>
                                <el-step title="Protection incendie"></el-step>
                                <el-step title="Electricité"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 19 && stepCounter <= 20" :active="active" finish-status="success" align-center>
                                <el-step title="Equipements"></el-step>
                                <el-step title="Ameublement et décoration"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 22 && stepCounter <= 23" :active="active" finish-status="success" align-center>
                                <el-step title="Constructions spéciales"></el-step>
                                <el-step title="Démolition sélective de bâtiment"></el-step>
                            </el-steps>
                            
                            <el-steps v-show="stepCounter >= 25 && stepCounter <= 29" :active="active" finish-status="success" align-center>
                                <el-step title="Préparation d'emplacement"></el-step>
                                <el-step title="Amélioration d'emplacement"></el-step>
                                <el-step title="Service de mécanique sur l'emplacement"></el-step>
                                <el-step title="Services d'électricité sur l'emplacement"></el-step>
                                <el-step title="Autre construction sur l'emplacement"></el-step>
                            </el-steps>
                            
                        </el-col>
                    </el-row>
                    
                    <!-- FORMULAIRE -->
                    <el-row :gutter="20" style="margin:40px; 0px">
                        <el-col :span="18" :offset="3">
                            <!-- <p>stepCounter: {{ stepCounter }}</p> -->
                            <el-form :model="ruleForm" :rules="rules0" ref="ruleForm1" v-show="stepCounter == 0" label-width="250px" class="demo-ruleForm">
                                <p>Bienvenue dans Time Estimator</p>
                                <p>Cette application permet de determiner le temps utile pour réaliser le DQE d'un batiment.</p>
                                <p>
                                Il vous suffit ensuite de faire la somme des durées obtenues de chaque batiment pour avoir la durée total de votre estimation projet (DQE).
                                </p>
                                <p>Pour commencer veuillez saisir le nom du batiment en cours dans le champ ci-dessous.</p>
                                <el-form-item
                                    label="Nom et Prénom"
                                    prop="userName">
                                    <el-input v-model="ruleForm.userName" autofocus></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="Nom du Batiment"
                                    prop="buildName">
                                    <el-input v-model="ruleForm.buildName" autofocus></el-input>
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item>
                                            <el-button disabled>Retour</el-button>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" style="text-align:right">
                                        <el-form-item>
                                            <el-button @click="next('ruleForm1')">Suivant</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                            </el-form>
                            
                            <section v-for="lot in ruleForm.lot" :key="lot.id">
                                <!--  v-show="stepCounter == lot.show" -->
                                <div v-show="stepCounter == lot.show" class="lot-card">
                                    <el-row>
                                        <el-col :span="6" class="lot-image">
                                            <i class="el-icon-edit"></i>
                                        </el-col>
                                        <el-col :span="16" style="text-align:center;padding-top:20px;">
                                            <p> Vous débutez le lot:</p>
                                            <h2> {{ lot.name }}</h2>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="12" style="text-align:center;padding-top:20px;">
                                            <el-button @click="backForm">Retour</el-button>
                                        </el-col>
                                        <el-col :span="12" style="text-align:center;padding-top:20px;">
                                            <el-button @click="nextLot()">Suivant</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                                
                                <div v-for="sousLot in lot.sousLot" :key="sousLot.id">
                                    <!-- v-show="stepCounter == sousLot.show" -->
                                    <el-form v-show="stepCounter == sousLot.show" :model="sousLot" :rules="rules1" label-position="left" :ref="sousLot.show"  class="demo-ruleForm">
                                        
                                        <el-form-item prop="included">
                                            <span style="display:block;line-height: 20px;">Ce batiment comporte-t-il le lot <b>{{ sousLot.name }}</b> ?</span>
                                            <!-- <el-switch v-model="sousLot.included"></el-switch> -->
                                            <el-radio-group v-model="sousLot.included" @change="choiceInit(sousLot, lot)" >
                                                <el-radio :label="false">Non</el-radio>
                                                <el-radio :label="true">Oui</el-radio>
                                            </el-radio-group>
                                            
                                        </el-form-item>
                                        
                                        <el-form-item prop="typeChecked">
                                            <span class="demonstration">De quels types de travaux de "{{ sousLot.name.toLowerCase() }}" "s'agit-il ?</span>
                                            
                                            <el-checkbox-group v-if="stepCounter === 2"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Fondations standards"></el-checkbox>
                                                <el-checkbox label="Fondations spéciales"></el-checkbox>
                                                <el-checkbox label="Dalle inférieure"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 3"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Excavation de sous-sol"></el-checkbox>
                                                <el-checkbox label="Murs de sous-sol"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 5"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Construction de plancher"></el-checkbox>
                                                <el-checkbox label="Construction de toiture"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 6"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Murs extérieurs"></el-checkbox>
                                                <el-checkbox label="Fenètres extérieures"></el-checkbox>
                                                <el-checkbox label="Portes extérieures"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 7"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Couverture"></el-checkbox>
                                                <el-checkbox label="Ouvertures de toiture"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 9"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Cloisons intérieures"></el-checkbox>
                                                <el-checkbox label="Portes intérieures"></el-checkbox>
                                                <el-checkbox label="Accéssoires intégrés"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 10"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Constructions escaliers"></el-checkbox>
                                                <el-checkbox label="Finitions d'escaliers"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 11"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Finitions des murs"></el-checkbox>
                                                <el-checkbox label="Finitions de planchers"></el-checkbox>
                                                <el-checkbox label="Finitions de plafonds"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 13"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Ascenseur et monte-charge"></el-checkbox>
                                                <el-checkbox label="Escaliers mécanique trottoirs roulants"></el-checkbox>
                                                <el-checkbox label="Autres systèmes de transport"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 14"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Appareils de plomberie"></el-checkbox>
                                                <el-checkbox label="Réseau d'eau domestique"></el-checkbox>
                                                <el-checkbox label="Réseau de drainage sanitaire"></el-checkbox>
                                                <el-checkbox label="Réseau de drainage pluvial"></el-checkbox>
                                                <el-checkbox label="Autre système de plomberie"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 15"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Source d'énergie"></el-checkbox>
                                                <el-checkbox label="Système de production de chaleur"></el-checkbox>
                                                <el-checkbox label="Système de production de froid"></el-checkbox>
                                                <el-checkbox label="Distribution de CVCA"></el-checkbox>
                                                <el-checkbox label="Unités autonomes ou monoblocs"></el-checkbox>
                                                <el-checkbox label="Régulation et instrumentation"></el-checkbox>
                                                <el-checkbox label="Essai et réglage de système"></el-checkbox>
                                                <el-checkbox label="Autres systèmes ou équipements CVCA"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 16"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Gicleurs"></el-checkbox>
                                                <el-checkbox label="Canalisations et robinets d'incendies"></el-checkbox>
                                                <el-checkbox label="Accéssoires de protections incendies"></el-checkbox>
                                                <el-checkbox label="Autres systèmes de protections incendies"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 17"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Service et distribution électrique"></el-checkbox>
                                                <el-checkbox label="Eclairage et distibution sécondaire"></el-checkbox>
                                                <el-checkbox label="Communication et sécurité"></el-checkbox>
                                                <el-checkbox label="Autres systèmes électriques"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 19"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Equipements commerciaux"></el-checkbox>
                                                <el-checkbox label="Equipements institutionnels"></el-checkbox>
                                                <el-checkbox label="Equipements pour véhicules"></el-checkbox>
                                                <el-checkbox label="Autres équipements"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 20"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Ameublements et décorations fixes"></el-checkbox>
                                                <el-checkbox label="Ameublements et décorations mobiles"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 22"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Structures spéciales"></el-checkbox>
                                                <el-checkbox label="Sous-ensembles intégrés"></el-checkbox>
                                                <el-checkbox label="Systèmes spéciaux de construction"></el-checkbox>
                                                <el-checkbox label="Installations spéciales"></el-checkbox>
                                                <el-checkbox label="Instrumentation et régulation spéciales"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 23"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Démolition sélective"></el-checkbox>
                                                <el-checkbox label="Elimination produits dangereux"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 25"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Déblaiement de l'emplacement"></el-checkbox>
                                                <el-checkbox label="Déplacement et démolition sur l'emplacement"></el-checkbox>
                                                <el-checkbox label="Térrassement"></el-checkbox>
                                                <el-checkbox label="Décontamination de l'emplacement"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 26"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Chaussée"></el-checkbox>
                                                <el-checkbox label="Aire de stationnement"></el-checkbox>
                                                <el-checkbox label="Surfaces piétonnières"></el-checkbox>
                                                <el-checkbox label="Aménagement de terrains"></el-checkbox>
                                                <el-checkbox label="Aménagement paysager"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 27"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Réseau d'alimentation et distribution d'eau"></el-checkbox>
                                                <el-checkbox label="Réseau d'égout sanitaire"></el-checkbox>
                                                <el-checkbox label="Réseau d'égout pluvial"></el-checkbox>
                                                <el-checkbox label="Réseau de distibution de chaleur"></el-checkbox>
                                                <el-checkbox label="Réseau de distribution de refroidissement"></el-checkbox>
                                                <el-checkbox label="Réseau de combustible"></el-checkbox>
                                                <el-checkbox label="Autres services de mécaniques"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 28"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Distribution d'électricité"></el-checkbox>
                                                <el-checkbox label="Eclairage extérieur"></el-checkbox>
                                                <el-checkbox label="Communication et sécurité sur l'emplacement"></el-checkbox>
                                                <el-checkbox label="Autres services d'électricité"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                            <el-checkbox-group v-else-if="stepCounter === 29"  v-model="sousLot.typeChecked" :disabled="sousLot.included == 0">
                                                <el-checkbox label="Tunnel de services et piétonnier"></el-checkbox>
                                                <el-checkbox label="Autres systèmes sur l'emplacement"></el-checkbox>
                                            </el-checkbox-group>
                                            
                                        </el-form-item>
                                        
                                        <el-form-item prop="plan">
                                            <span style="display:block;line-height: 20px;"> Disposer-vous de tous les éléments pour vérifiez les quantités unitaires de l'ouvrage ?</span>
                                            <el-switch v-model="sousLot.plan" :disabled="sousLot.included == 0"></el-switch>
                                        </el-form-item>
                                        
                                        <el-form-item prop="quantifyTime">
                                            <span style="display:block;line-height: 20px;"> En combien de temps pourriez-vous ressortir le devis quantitatif ?</span>
                                            <el-input-number size="mini" v-model.number="sousLot.quantifyTime" :disabled="sousLot.included == 0 || sousLot.plan == 0"></el-input-number> (en heures).
                                        </el-form-item>
                                        
                                        <el-row :gutter="20">
                                            <el-col :span="6" :offset="6">
                                                <el-form-item>
                                                    <el-button @click="backForm">Retour</el-button>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="6" style="text-align:right">
                                                <el-form-item>
                                                    <el-button @click="next('' + sousLot.show + '')">Suivant</el-button>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        
                                    </el-form>
                                    <!-- End -->
                                </div>
                            </section>
                            
                            <el-form :model="ruleForm.othersTime" :rules="rules3" label-position="left" ref="ruleFormDoc" v-show="stepCounter == 30" class="demo-ruleForm">
                                
                                <el-form-item prop="numberOfLines">
                                    <span style="display:block;line-height: 20px;">Combien de ligne ce DQE compte-t-il ?</span>
                                    <el-input-number :min="1" size="mini" v-model.number="ruleForm.othersTime.numberOfLines" autofocus></el-input-number>
                                </el-form-item>
                                
                                <el-form-item prop="linesComplexity">
                                    <span class="demonstration">Sur une échelle de 0 à 10, à combien estimez-vous la complexité de ce DQE ?</span>
                                    <el-slider
                                        v-model.number="ruleForm.othersTime.linesComplexity"
                                        :step="5"
                                        :min="1"
                                        :max="10"
                                        show-stops>
                                    </el-slider>
                                </el-form-item>
                                <!--
                                 <el-form-item prop="documentTime">
                                 <span style="display:block;line-height: 20px;">De combien de temps avez-vous besoin pour préparer les documents de ce DQE ?</span>
                                 <el-input-number size="mini" v-model.number="ruleForm.othersTime.documentTime" ></el-input-number>
                                 </el-form-item>
                                 
                                 <el-form-item prop="revisionTime">
                                 <span style="display:block;line-height: 20px;">De combien de temps avez-vous besoin pour réviser ce DQE ?</span>
                                 <el-input-number size="mini" v-model.number="ruleForm.othersTime.revisionTime" ></el-input-number>
                                 </el-form-item>
                                 -->
                                <el-row :gutter="20">
                                    <el-col :span="6" :offset="6">
                                        <el-form-item>
                                            <el-button @click="backForm">Retour</el-button>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6" style="text-align:right">
                                        <el-form-item>
                                            <el-button @click="next('ruleFormDoc')">Suivant</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <!-- End -->
                            
                            
                        </el-col>
                        <el-col :span="22" :offset="1">
                            <div v-show="stepCounter == 31">
                                <el-col :span="24">
                                    <div ref="finalReport">
                                        <table ref="reportHeader" border="1" style="border-collapse: collapse;width:100%;">
                                            <tr style="border: 1px solid black;">
                                                <td style="font-size:11px;min-width:130px;border: 1px solid black;">
                                                    Ref. :
                                                </td>
                                                <td rowspan="2" style="text-align:center;border: 1px solid black;">
                                                    <h3 style="margin:10px;">RAPPORT D'ESTIMATION DE L'ECHEANCIER</h3>
                                                </td>
                                                <td rowspan="3"  style="text-align:center;widht:auto;border: 1px solid black;">
                                                    <img class="logo" src="../assets/logo.png" height="65"/>
                                                </td>
                                            </tr>
                                            <tr style="border: 1px solid black;">
                                                <td style="font-size:11px;border: 1px solid black;">
                                                    <b>Date :</b> {{ dateNow() }}
                                                </td>
                                            </tr>
                                            <tr style="border: 1px solid black;">
                                                <td style="font-size:11px;border: 1px solid black;">
                                                    <b>Rédaction :</b> <br/>{{ ruleForm.userName }}
                                                </td>
                                                <td style="text-align:center;margin:10px;border: 1px solid black;">
                                                    <h4 style="margin:10px;">Projet {{ ruleForm.buildName.toUpperCase() }}</h4>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        
                                        <br/>
                                        <p>Le batiment <b>{{ ruleForm.buildName.toUpperCase() }}</b> comporte les lots suivants:</p>
                                        <ul>
                                            <li v-for="(lot, index) in ruleForm.lot" :key="lot.id" v-if="lot.selected > 0">
                                                <h4> {{ lot.name }} </h4>
                                                <ul v-for="(souslot, index) in lot.sousLot" :key="souslot.id" v-if="souslot.included">
                                                    <h4 class="report-sous-lot"> {{ souslot.name }}</h4>
                                                    <li v-for="t in souslot.typeChecked"> {{t}},</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <hr/>
                                        <p>Vous disposez de tous les éléments pour ressortir les quantités unitaires des sous-lots suivants:</p>
                                        <span v-for="(lot, index) in ruleForm.lot" :key="lot.id" v-if="lot.selected > 0">
                                            <span v-for="(souslot, index) in lot.sousLot" :key="souslot.id" v-if="souslot.included === true && souslot.plan === true" style="display:block;margin-bottom:20px;">
                                                <i class="el-icon-warning" style="color:#67C23A;"></i> {{ souslot.id }} - {{ souslot.name }}
                                                (<small v-for="t in souslot.typeChecked"> {{t}}, </small>)
                                            </span>
                                        </span>
                                        <br/>
                                        <p>Vous ne disposez pas d'informations pour ressortir les quantités unitaires des sous-lots suivants:</p>
                                        <span v-for="(tol, index) in ruleForm.lot" :key="tol.id" v-if="tol.selected > 0">
                                            <span v-for="(soustol, index) in tol.sousLot" :key="soustol.id" v-if="soustol.included === true && soustol.plan === false" style="display:block;margin-bottom:20px;">
                                                <i class="el-icon-warning" style="color:#E6A23C;"></i> {{ soustol.id }} - {{ soustol.name }}
                                                (<small v-for="t in soustol.typeChecked"> {{t}}, </small>)
                                            </span>
                                        </span>
                                        <br/>
                                        <el-alert title="Temps estimé:" type="success" :closable="false">
                                            Le temps estimé pour les sous-lots dont vous disposez les éléments de métré est de : <b>{{ estimatedTime }}</b> heures, soit <b>{{ Math.ceil(estimatedTime / 8) }}</b> jour(s).
                                        </el-alert>
                                        
                                        <el-alert title="Temps calculé:" type="warning" :closable="false">
                                            Le temps estimé en fonction de votre appréciation de ce DQE est de : <b>{{ computedTime }}</b> heures, soit <b>{{ Math.ceil(computedTime / 8) }}</b> jour(s).
                                        </el-alert>
                                    </div>
                                </el-col>
                                <el-col :span="12" style="text-align:left;padding-top:10px;">
                                    <el-button @click="backForm">Retour</el-button>
                                </el-col>
                                <el-col :span="12" style="text-align:right;padding-top:10px;">
                                    <el-button @click="printReport()">Imprimer</el-button>
                                </el-col>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
                <el-footer>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="Math.round(stepCounter * 100 / 31)" status="success"></el-progress>
                </el-footer>
            </el-container>
        </el-container>
    </div>

<!-- Metro UI Component

### BASE

<div class="container"></div>
<div class="container-fluid"></div>

<div class="grid">
    <div class="row">
        <div class="cell"><div>1</div></div>
        <div class="cell"><div>2</div></div>
        <div class="cell"><div>3</div></div>
        <div class="cell"><div>4</div></div>
        <div class="cell"><div>5</div></div>
        <div class="cell"><div>6</div></div>
        <div class="cell"><div>7</div></div>
        <div class="cell"><div>8</div></div>
        <div class="cell"><div>9</div></div>
        <div class="cell"><div>10</div></div>
        <div class="cell"><div>11</div></div>
        <div class="cell"><div>12</div></div>
    </div>
    <div class="row">
        <div class="cell-3"><div>cell-3</div></div>
        <div class="cell-3"><div>cell-3</div></div>
        <div class="cell-3"><div>cell-3</div></div>
        <div class="cell-3"><div>cell-3</div></div>
    </div>
    <div class="row">
        <div class="cell-4 offset-4"><div>cell-4 + offset-4</div></div>
    </div>
    <div class="row">
        <div class="cell-3"><div>cell-3</div></div>
        <div class="cell-6 offset-3"><div>cell-6 + offset-3</div></div>
    </div>
    <div class="row">
        <div class="cell-4 offset-4"><div>cell-4 + offset-4</div></div>
        <div class="cell"><div>1</div></div>
        <div class="cell"><div>1</div></div>
        <div class="cell"><div>1</div></div>
        <div class="cell"><div>1</div></div>
    </div>
    <div class="row">
        <div class="cell">
            <div class="row">
                <div class="cell"><div>nested</div></div>
                <div class="cell"><div>nested</div></div>
                <div class="cell"><div>nested</div></div>
                <div class="cell"><div>nested</div></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="colspan-4"></div>
        <div class="colspan-4"></div>
        <div class="colspan-4"></div>
    </div>
    <div class="row">
        <div class="cell-sm-full cell-md-one-third cell-lg-3"></div>
        <div class="cell-sm-full cell-md-two-third cell-lg-3"></div>
        <div class="cell-sm-full cell-md-half cell-lg-3"></div>
        <div class="cell-sm-full cell-md-half cell-lg-3"></div>
    </div>
</div>

<form>
    <div class="form-group">
        <label>Email address</label>
        <input type="email" placeholder="Enter email"/>
        <small class="text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="Enter email"/>
    </div>
    <div class="form-group">

        <input type="text" data-role="search">

        <select data-role="select">
            <option class="fg-cyan">One</option>
            <option class="text-bold fg-red">Two</option>
            <option selected class="fg-green">Three</option>
            <option value="mini">Mini</option>
            <optgroup label="Virtual servers">
                <option value="evps1">eVPS-1</option>
                <option value="evps2">eVPS-2</option>
                <option value="evps4">eVPS-4</option>
                <option value="evps8">eVPS-8</option>
            </optgroup>
        </select>

        <textarea data-role="textarea" data-auto-size="true" data-max-height="200"></textarea>

        <input type="checkbox" data-role="checkbox" data-caption="Check" disabled checked>
        <input type="checkbox" data-role="checkbox" data-caption="Remember me">

        <input type="radio" data-role="radio" data-caption="Check" name="r2" disabled>
        <input type="radio" data-role="radio" data-caption="Check" name="r2" checked disabled>

        <input type="checkbox" data-role="switch" data-caption="Check" disabled checked>

        <input type="file" data-role="file" data-caption="Choose file">
        <input type="file" data-role="file" data-caption="<span class='mif-folder'></span>">
    </div>
    <div class="form-group">
        <button class="button success">Submit data</button>
        <input type="button" class="button" value="Cancel">
        <button class="button"><span class="mif-checkmark"></span> Font</button>
        <button class="button"><span class="mif-users"></span></button>
        <button class="button"><img src="images/checkmark.png"> Image</button>
        <button class="button"><img src="images/keycdn-logo.svg"></button>
    </div>
</form>

<div class="img-container">
    <img data-src="holder.js/100px100">
</div>

<div class="img-container rounded">
    <img data-src="holder.js/100px100">
</div>

<div class="img-container drop-shadow">
    <img data-src="holder.js/100px100">
</div>

<div class="img-container thumbnail">
    <img data-src="holder.js/100px100">
</div>

<div class="img-container thumbnail">
    <img data-src="holder.js/100px100">
    <span class="title">
        Pol. To some, a power is a heaven for meetting.
    </span>
</div>

<div class="img-container selected">
    <img data-src="holder.js/100px100">
</div>

<figure>
    <img data-src="holder.js/400x300">
    <figcaption>A caption for the above image</figcaption>
</figure>

# MENU

<div data-role="appbar">
    ...
    <div class="app-bar-container">
        <a href="#" class="app-bar-item dropdown-toggle">Always</a>
        <ul class="d-menu" data-role="dropdown">
            <li><a href="#">Windows 10</a></li>
            <li>
                <a href="#" class="dropdown-toggle">Office 365</a>
                <ul class="d-menu" data-role="dropdown">
                    <li><a href="#">Windows 10</a></li>
                    <li><a href="#">Office 365</a></li>
                    <li class="divider bg-lightGray"></li>
                    <li><a href="#">Skype</a></li>
                </ul>
            </li>
            <li class="divider bg-lightGray"></li>
            <li><a href="#">Skype</a></li>
        </ul>
    </div>
    ...
    <ul class="app-bar-menu">
        <li><a href="#">Home</a></li>
        <li>
            <a href="#" class="dropdown-toggle">Products</a>
            <ul class="d-menu" data-role="dropdown">
                <li><a href="#">Windows 10</a></li>
                <li><a href="#">Office 365</a></li>
                <li class="divider bg-lightGray"></li>
                <li><a href="#">Skype</a></li>
            </ul>
        </li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contacts</a></li>
    </ul>
</div>

<ul class="sidenav-m3">
    <li class="title">Title 1</li>
    <li class="active"><a href="#"><span class="mif-home icon"></span>Dashboard</a></li>
    <li class="stick-right bg-red"><a href="#"><span class="mif-cog icon"></span>Layouts</a></li>
    <li class="stick-left bg-green">
        <a class="dropdown-toggle" href="#"><span class="mif-tree icon"></span>Sub menu</a>
        <ul class="d-menu" data-role="dropdown" style="display: none;">
            <li><a href=""><span class="mif-vpn-lock icon"></span> Subitem 1</a></li>
            <li><a href="">Subitem 2</a></li>
            <li><a href="">Subitem 3</a></li>
            <li><a href="">Subitem 4</a></li>
            <li class="disabled"><a href="">Subitem 5</a></li>
        </ul>
    </li>
    <li class=""><a href="#">Thread item</a></li>
    <li class="disabled"><a href="#">Disabled item</a></li>

    <li class="title">Title 2</li>
    <li><a href="#">Other Item 1</a></li>
    <li><a href="#">Other item 2</a></li>
    <li><a href="#">Other item 3</a></li>
</ul>

<ul class="v-menu">
    <li class="menu-title">General</li>
    <li><a href="#"><span class="mif-home icon"></span> Home</a></li>
    <li class="menu-title">Products</li>
    <li><a href="#"><span class="mif-windows icon"></span> Windows</a></li>
    <li><a href="#"><span class="mif-library icon"></span> Office 365</a></li>
    <li><a href="#"><span class="mif-skype icon"></span> Skype</a></li>
    <li class="menu-title">Support</li>
    <li>
        <a href="#" data-hotkey="Alt+F1">Community</a>
        <ul class="v-menu" data-role="dropdown">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Github</a></li>
            <li><a href="#">Forum</a></li>
            <li class="divider"></li>
            <li class="p-2 bg-light">
                <button class="button square primary"><span class="mif-target"></span></button>
                <button class="button square success"><span class="mif-apps"></span></button>
                <button class="button square alert"><span class="mif-file-code"></span></button>
                <button class="button square warning"><span class="mif-download"></span></button>
            </li>
        </ul>
    </li>
    <li class="menu-title">Shop</li>
    <li><a href="#"><span class="mif-cart icon"></span> Cart</a></li>
</ul>

<nav data-role="ribbonmenu">
    <ul class="tabs-holder">
        <li><a href="#section-group">Group</a></li>
    </ul>

    <div class="content-holder">
        <div class="section" id="section-group">
            <div class="group">

                <div data-role="buttonsGroup" data-cls-active="active">
                    <button class="ribbon-button">
                        <span class="icon">
                            <span class="mif-vertical-align-top"></span>
                        </span>
                        <span class="caption">Top</span>
                    </button>
                    <button class="ribbon-button">
                        <span class="icon">
                            <span class="mif-vertical-align-center"></span>
                        </span>
                        <span class="caption">Center</span>
                    </button>
                    <button class="ribbon-button">
                        <span class="icon">
                            <span class="mif-vertical-align-bottom"></span>
                        </span>
                        <span class="caption">Bottom</span>
                    </button>
                </div>

                <span class="title">Role group</span>
            </div>

            <div class="group">
                <div class="ribbon-toggle-group">
                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-list"></span>
                            </span>
                        <span class="caption">List</span>
                    </button>

                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-apps"></span>
                            </span>
                        <span class="caption">Content</span>
                    </button>

                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-table"></span>
                            </span>
                        <span class="caption">Icons</span>
                    </button>

                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-image"></span>
                            </span>
                        <span class="caption">Small icons</span>
                    </button>

                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-images"></span>
                            </span>
                        <span class="caption">Large icons</span>
                    </button>

                    <button class="ribbon-icon-button">
                            <span class="icon">
                                <span class="mif-windows"></span>
                            </span>
                        <span class="caption">Tiles</span>
                    </button>
                </div>

                <span class="title">Group class</span>
            </div>

        </div>
    </div>
</nav>

### CONTROLE

<div>
<ul data-role="tabs">
    <li><a href="#">Home</a></li>
    <li><a href="#">Profile</a></li>
    <li><a href="#">Links</a></li>
    <li class="disabled"><a href="#">Disabled</a></li>
</ul>

<ul class="tabs-expand-md" data-role="tabs">
...
</ul>
</div>

<div data-role="stepper"
     data-steps="5"
     data-step="3"
     data-view="diamond"
     data-cls-step="rounded"
     data-cls-complete="bg-pink"
     data-cls-current="bg-red">
</div>

-->


</template>

<script>
// import debounce from 'lodash/debounce'

import html2pdf from 'html2pdf.js'

export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
              // alert(JSON.stringify(rule))
        callback(new Error('Ce champs est réquis'))
      } else if (value.length < 3 || value.length > 100) {
        callback(new Error('Ce champs doit contenir entre 3 et 100 lettres'))
      } else {
              /*
              if (value !== '') {
                this.$refs['ruleForm1'].validateField('buildName');
              }
              */
        callback()
      }
    }
    var validateNumber = (rule, value, callback) => {
            // INFRASTRUCTURES
      if ((this.ruleForm.lot[0].sousLot[0].included === true && this.ruleForm.lot[0].sousLot[0].plan === true && this.stepCounter === 2) ||
             (this.ruleForm.lot[0].sousLot[1].included === true && this.ruleForm.lot[0].sousLot[1].plan === true && this.stepCounter === 3) ||
             // SUPPERSTRUCTURES ET ENVELOPPE
             (this.ruleForm.lot[1].sousLot[0].included === true && this.ruleForm.lot[1].sousLot[0].plan === true && this.stepCounter === 5) ||
             (this.ruleForm.lot[1].sousLot[1].included === true && this.ruleForm.lot[1].sousLot[1].plan === true && this.stepCounter === 6) ||
             (this.ruleForm.lot[1].sousLot[2].included === true && this.ruleForm.lot[1].sousLot[2].plan === true && this.stepCounter === 7) ||
             // AMENAGEMENT INTERIEUR
             (this.ruleForm.lot[2].sousLot[0].included === true && this.ruleForm.lot[2].sousLot[0].plan === true && this.stepCounter === 9) ||
             (this.ruleForm.lot[2].sousLot[1].included === true && this.ruleForm.lot[2].sousLot[1].plan === true && this.stepCounter === 10) ||
             (this.ruleForm.lot[2].sousLot[2].included === true && this.ruleForm.lot[2].sousLot[2].plan === true && this.stepCounter === 11) ||
             // SERVICES
             (this.ruleForm.lot[3].sousLot[0].included === true && this.ruleForm.lot[3].sousLot[0].plan === true && this.stepCounter === 13) ||
             (this.ruleForm.lot[3].sousLot[1].included === true && this.ruleForm.lot[3].sousLot[1].plan === true && this.stepCounter === 14) ||
             (this.ruleForm.lot[3].sousLot[2].included === true && this.ruleForm.lot[3].sousLot[2].plan === true && this.stepCounter === 15) ||
             (this.ruleForm.lot[3].sousLot[3].included === true && this.ruleForm.lot[3].sousLot[3].plan === true && this.stepCounter === 16) ||
             (this.ruleForm.lot[3].sousLot[4].included === true && this.ruleForm.lot[3].sousLot[4].plan === true && this.stepCounter === 17) ||
             // EQUIPEMENTS ET AMEUBLEMENT
             (this.ruleForm.lot[4].sousLot[0].included === true && this.ruleForm.lot[4].sousLot[0].plan === true && this.stepCounter === 19) ||
             (this.ruleForm.lot[4].sousLot[1].included === true && this.ruleForm.lot[4].sousLot[1].plan === true && this.stepCounter === 20) ||
             // CONSTRUCTIONS SPECIALES ET DEMOLITION
             (this.ruleForm.lot[5].sousLot[0].included === true && this.ruleForm.lot[5].sousLot[0].plan === true && this.stepCounter === 22) ||
             (this.ruleForm.lot[5].sousLot[1].included === true && this.ruleForm.lot[5].sousLot[1].plan === true && this.stepCounter === 23) ||
             // AMENAGEMENT D'EMPLACEMENT
             (this.ruleForm.lot[6].sousLot[0].included === true && this.ruleForm.lot[6].sousLot[0].plan === true && this.stepCounter === 25) ||
             (this.ruleForm.lot[6].sousLot[1].included === true && this.ruleForm.lot[6].sousLot[1].plan === true && this.stepCounter === 26) ||
             (this.ruleForm.lot[6].sousLot[2].included === true && this.ruleForm.lot[6].sousLot[2].plan === true && this.stepCounter === 27) ||
             (this.ruleForm.lot[6].sousLot[3].included === true && this.ruleForm.lot[6].sousLot[3].plan === true && this.stepCounter === 28) ||
             (this.ruleForm.lot[6].sousLot[4].included === true && this.ruleForm.lot[6].sousLot[4].plan === true && this.stepCounter === 29) ||
             (this.stepCounter === 30)
            ) {
        if (!value) {
          return callback(new Error('Veuillez saisir un chiffre'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            alert(typeof value)
            callback(new Error('Veuillez saisir un chiffre'))
          } else {
            if (this.stepCounter === 52 && value < 0) {
              callback(new Error('Ce chiffre doit être supérieure ou égal à 0'))
            } else if (value <= 0) {
              callback(new Error('Ce chiffre doit être supérieure à 0'))
            } else {
              callback()
            }
          }
        }, 1000)
      } else {
        callback()
      }
    }
    var validateCheckBoxes = (rule, value, callback) => {
            // INFRASTRUCTURES
      if ((this.ruleForm.lot[0].sousLot[0].included === true && this.stepCounter === 2) ||
             (this.ruleForm.lot[0].sousLot[1].included === true && this.stepCounter === 3) ||
             // SUPPERSTRUCTURES ET ENVELOPPE
             (this.ruleForm.lot[1].sousLot[0].included === true && this.stepCounter === 5) ||
             (this.ruleForm.lot[1].sousLot[1].included === true && this.stepCounter === 6) ||
             (this.ruleForm.lot[1].sousLot[2].included === true && this.stepCounter === 7) ||
             // AMENAGEMENT INTERIEUR
             (this.ruleForm.lot[2].sousLot[0].included === true && this.stepCounter === 9) ||
             (this.ruleForm.lot[2].sousLot[1].included === true && this.stepCounter === 10) ||
             (this.ruleForm.lot[2].sousLot[2].included === true && this.stepCounter === 11) ||
             // SERVICES
             (this.ruleForm.lot[3].sousLot[0].included === true && this.stepCounter === 13) ||
             (this.ruleForm.lot[3].sousLot[1].included === true && this.stepCounter === 14) ||
             (this.ruleForm.lot[3].sousLot[2].included === true && this.stepCounter === 15) ||
             (this.ruleForm.lot[3].sousLot[3].included === true && this.stepCounter === 16) ||
             (this.ruleForm.lot[3].sousLot[4].included === true && this.stepCounter === 17) ||
             // EQUIPEMENTS ET AMEUBLEMENT
             (this.ruleForm.lot[4].sousLot[0].included === true && this.stepCounter === 19) ||
             (this.ruleForm.lot[4].sousLot[1].included === true && this.stepCounter === 20) ||
             // CONSTRUCTIONS SPECIALES ET DEMOLITION
             (this.ruleForm.lot[5].sousLot[0].included === true && this.stepCounter === 22) ||
             (this.ruleForm.lot[5].sousLot[1].included === true && this.stepCounter === 23) ||
             // AMENAGEMENT D'EMPLACEMENT
             (this.ruleForm.lot[6].sousLot[0].included === true && this.stepCounter === 25) ||
             (this.ruleForm.lot[6].sousLot[1].included === true && this.stepCounter === 26) ||
             (this.ruleForm.lot[6].sousLot[2].included === true && this.stepCounter === 27) ||
             (this.ruleForm.lot[6].sousLot[3].included === true && this.stepCounter === 28) ||
             (this.ruleForm.lot[6].sousLot[4].included === true && this.stepCounter === 29)
            ) {
        if (typeof value !== 'undefined' && value.length > 0) {
          callback()
        } else {
          callback(new Error('Please specify your choice'))
        }
      } else {
                // alert("Else");
        callback()
      }
    }
    return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
      msg: 'Hello World!',
      stepCounter: 0,
      estimatedTime: 0,
            // active: 0,
      ruleForm: {
        buildName: '',
        userName: '',
        othersTime: {
          numberOfLines: 0,
          linesComplexity: 5,
          revisionTime: 1,
          documentTime: 1
        },
        lot: [
          {
            id: 'A',
            name: 'INFRASTRUCTURES',
            show: 1,
            selected: 0,
            sousLot: [
              {
                id: 'A10',
                name: 'Fondation',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 2
              },
              {
                id: 'A20',
                name: 'Constrcution de sous-sol',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 3
              }
            ]
          },
          {
            id: 'B',
            name: 'SUPERSTRUCTURE ET ENVELOPPE',
            show: 4,
            selected: 0,
            sousLot: [
              {
                id: 'B10',
                name: 'Superstructures',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 5
              },
              {
                id: 'B20',
                name: 'Enveloppe extérieure',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 6
              },
              {
                id: 'B30',
                name: 'Toiture',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 7
              }
            ]
          },
          {
            id: 'C',
            name: 'AMENAGEMENT INTERIEUR',
            show: 8,
            selected: 0,
            sousLot: [
              {
                id: 'C10',
                name: 'Constrcution intérieur',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 9
              },
              {
                id: 'C20',
                name: 'Escaliers',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 10
              },
              {
                id: 'C30',
                name: 'Finitions intérieures',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 11
              }
            ]
          },
          {
            id: 'D',
            name: 'SERVICES',
            show: 12,
            selected: 0,
            sousLot: [
              {
                id: 'D10',
                name: 'Moyens de transport',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 13
              },
              {
                id: 'D20',
                name: 'Plomberie',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 14
              },
              {
                id: 'D30',
                name: 'Chauffage, Ventilation et Conditionnement d\'air',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 15
              },
              {
                id: 'D40',
                name: 'Protection incendie',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 16
              },
              {
                id: 'D50',
                name: 'Electricité',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 17
              }
            ]
          },
          {
            id: 'E',
            name: 'EQUIPEMENTS ET AMEUBLEMENT',
            show: 18,
            selected: 0,
            sousLot: [
              {
                id: 'E10',
                name: 'Equipements',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 19
              },
              {
                id: 'E20',
                name: 'Ameublement et décoration',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 20
              }
            ]
          },
          {
            id: 'F',
            name: 'CONSTRUCTIONS SPECIALES ET DEMOLITION',
            show: 21,
            selected: 0,
            sousLot: [
              {
                id: 'F10',
                name: 'Constructions spéciales',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 22
              },
              {
                id: 'F20',
                name: 'Démolition sélective de bâtiment',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 23
              }
            ]
          },
          {
            id: 'G',
            name: 'AMENAGEMENT D\'EMPLACEMENT',
            show: 24,
            selected: 0,
            sousLot: [
              {
                id: 'G10',
                name: 'Préparation d\'emplacement',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 25
              },
              {
                id: 'G20',
                name: 'Amélioration d\'emplacement',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 26
              },
              {
                id: 'G30',
                name: 'Service de mécanique sur l\'emplacement',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 27
              },
              {
                id: 'G40',
                name: 'Services d\'électricité sur l\'emplacement',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 28
              },
              {
                id: 'G50',
                name: 'Autre construction sur l\'emplacement',
                included: false,
                typeList: [],
                typeChecked: [],
                plan: false,
                quantifyTime: 0,
                show: 29
              }
            ]
          }
        ] // Fin des lots
      },
      rules0: {
        buildName: [
                       { validator: validateName, trigger: 'blur' }
        ],
        userName: [
                       { validator: validateName, trigger: 'blur' }
        ]
      },
      rules1: {
        typeChecked: [
                        { validator: validateCheckBoxes, trigger: 'blur' }
        ],
        planningTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ],
        quantifyTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ]
      },
      rules2: {
        quotationDemandTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ],
        contractorTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ]
      },
      rules3: {
        numberOfLines: [
                            { validator: validateNumber, trigger: 'blur' }
        ],
        linesComplexity: [
                            { validator: validateNumber, trigger: 'blur' }
        ],
        revisionTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ],
        documentTime: [
                            { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
    /*
    watch: {
        ruleForm: function (val) {
            this.ruleForm.lot.forEach(souslot => {
                    souslot.forEach(slot => {
                        if (slot.show === this.stepCounter && slot.included === false) {
                            slot.typeChecked = []
                            slot.plan = false
                            slot.quantifyTime = 0
                            return
                        }
                    })
                }
            )
        },
    },
    */
  created () {
        // this.$store.dispatch('loadTables')
  },
  mounted () {
    // Metro.init();
  },
  computed: {
    active () {
            /*
            return this.firstName + ' ' + this.lastName
            */
      var array0 = [2, 5, 9, 8, 13, 19, 22, 25]
      var array1 = [3, 6, 10, 14, 20, 23, 26]
      var array2 = [7, 11, 15, 27]
      var array3 = [16, 28]
      var array4 = [17, 29]

      if (array0.includes(this.stepCounter)) {
        return 0
      } else if (array1.includes(this.stepCounter)) {
        return 1
      } else if (array2.includes(this.stepCounter)) {
        return 2
      } else if (array3.includes(this.stepCounter)) {
        return 3
      } else {
        return 4
      }
    },
    activeMenu () {
      if ([2, 3].includes(this.stepCounter)) {
        return '2-1'
      } else if ([4, 5].includes(this.stepCounter)) {
        return '2-2'
      } else if ([7, 8].includes(this.stepCounter)) {
        return '2-3'
      } else if ([9, 10].includes(this.stepCounter)) {
        return '2-4'
      } else if ([11, 12].includes(this.stepCounter)) {
        return '2-5'
      } else if ([14, 15].includes(this.stepCounter)) {
        return '2-6'
      } else if ([16, 17].includes(this.stepCounter)) {
        return '2-7'
      } else if ([18, 19].includes(this.stepCounter)) {
        return '2-8'
      } else if ([21, 22].includes(this.stepCounter)) {
        return '2-9'
      } else if ([23, 24].includes(this.stepCounter)) {
        return '2-10'
      } else if ([25, 26].includes(this.stepCounter)) {
        return '2-11'
      } else if ([27, 28].includes(this.stepCounter)) {
        return '2-12'
      } else if ([29, 30].includes(this.stepCounter)) {
        return '2-13'
      } else if ([32, 33].includes(this.stepCounter)) {
        return '2-14'
      } else if ([34, 35].includes(this.stepCounter)) {
        return '2-15'
      } else if ([37, 38].includes(this.stepCounter)) {
        return '2-16'
      } else if ([39, 40].includes(this.stepCounter)) {
        return '2-17'
      } else if ([42, 43].includes(this.stepCounter)) {
          return '2-18'
        } else if ([44, 45].includes(this.stepCounter)) {
              return '2-19'
            } else if ([46, 47].includes(this.stepCounter)) {
              return '2-20'
            } else if ([48, 49].includes(this.stepCounter)) {
              return '2-21'
            } else if ([50, 51].includes(this.stepCounter)) {
              return '2-22'
            } else if (this.stepCounter === 52) {
              return '3'
            } else {
              return '1'
            }
    },
    stepMenu () {
      if (this.stepCounter === 0) {
        return 0
      } else if (this.stepCounter === 1) {
        return 1
      } else if ([2, 3].includes(this.stepCounter)) {
        return 2
      } else if ([4, 5].includes(this.stepCounter)) {
        return 3
      } else if (this.stepCounter === 6) {
        return 4
      } else if ([7, 8].includes(this.stepCounter)) {
        return 5
      } else if ([9, 10].includes(this.stepCounter)) {
        return 6
      } else if ([11, 12].includes(this.stepCounter)) {
        return 7
      } else if (this.stepCounter === 13) {
        return 8
      } else if ([14, 15].includes(this.stepCounter)) {
        return 9
      } else if ([16, 17].includes(this.stepCounter)) {
        return 10
      } else if ([18, 19].includes(this.stepCounter)) {
        return 11
      } else if (this.stepCounter === 20) {
        return 12
      } else if ([21, 22].includes(this.stepCounter)) {
        return 13
      } else if ([23, 24].includes(this.stepCounter)) {
        return 14
      } else if ([25, 26].includes(this.stepCounter)) {
        return 15
      } else if ([27, 28].includes(this.stepCounter)) {
        return 16
      } else if ([29, 30].includes(this.stepCounter)) {
          return 17
        } else if (this.stepCounter === 31) {
              return 18
            } else if ([32, 33].includes(this.stepCounter)) {
              return 19
            } else if ([34, 35].includes(this.stepCounter)) {
              return 20
            } else if (this.stepCounter === 36) {
              return 21
            } else if ([37, 38].includes(this.stepCounter)) {
              return 22
            } else if ([39, 40].includes(this.stepCounter)) {
              return 23
            } else if (this.stepCounter === 41) {
              return 24
            } else if ([42, 43].includes(this.stepCounter)) {
              return 25
            } else if ([44, 45].includes(this.stepCounter)) {
              return 26
            } else if ([46, 47].includes(this.stepCounter)) {
              return 27
            } else if ([48, 49].includes(this.stepCounter)) {
              return 28
            } else if ([50, 51].includes(this.stepCounter)) {
              return 29
            } else if (this.stepCounter === 52) {
              return 30
            } else {
              return 31
            }
    },
    count () {
            // return this.$store.getters.tables.length
    },
    computedTime () {
      return Math.ceil(this.ruleForm.othersTime.linesComplexity * this.ruleForm.othersTime.numberOfLines / 60)
    }
  },
  mounted () {
    console.log(this.ruleForm.lot)
  },
  methods: {
    dateNow () {
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 // January is 0!

      var yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      var today = dd + '/' + mm + '/' + yyyy
      return today
    },
    estimateTime (slot) {
      debounce(function () {
        this.estimatedTime = this.estimatedTime + slot.quantifyTime
      },
                // C'est le nombre de millisecondes que nous attendons
                // pour que l’utilisateur arrête de taper.
                5000
            )
    },
    choiceInit (slot, lot) {
            // alert(slot.id)
      if (slot.show === this.stepCounter && slot.included === false) {
        slot.typeChecked = []
        slot.plan = false
        slot.quantifyTime = 0
        lot.selected--
      } else {
        lot.selected++
      }
    },
    next (formName) {
            // alert(typeof this.ruleForm.lot[0])
      if (this.stepCounter === 0 &&
                (this.ruleForm.buildName === '' || this.ruleForm.buildName.length < 3 || this.ruleForm.buildName.length > 100 ||
                this.ruleForm.userName === '' || this.ruleForm.userName.length < 3 || this.ruleForm.userName.length > 100)
            ) {
                // this.$refs['ruleForm1'].validate()
                // alert('next(): ' + this.ruleForm.buildName)
        return false
      }

      if (this.stepCounter === 30) {
        this.estimatedTime = 0
                // var actual = this.estimatedTime
        this.ruleForm.lot.forEach(function (lots) {
                // var x = arrayItem.prop1 + 2;
          lots.sousLot.forEach(function (slot) {
            if (slot.plan === true) {
                        // alert(slot.name)
              this.estimatedTime += slot.quantifyTime
            }
          }, this)
        }, this)
      }

      if (Array.isArray(this.$refs[formName])) {
                // alert("Is Array")
        this.$refs[formName][0].validate((valid) => {
          if (valid) {
                        // alert('submit! ' + valid)
            if (this.stepCounter++ > 53) this.stepCounter = 0
          } else {
                        // alert(valid)
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                        // alert('submit! ' + valid)
            if (this.stepCounter++ > 53) this.stepCounter = 0
          } else {
                        // alert(valid)
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    nextLot () {
      if (this.stepCounter++ > 31) this.active = 0
    },
    backForm () {
      if (this.stepCounter-- < 0) this.active = 0
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    printReport () {
      var element = this.$refs['finalReport']

      element.insertAdjacentHTML('beforebegin', header)
      html2pdf(element, {
        margin: [0.5, 0.5],
        filename: 'myReport.pdf',
        image: { type: 'png', quality: 1.0 },
        html2canvas: { dpi: 300, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {

    color: #2c2c2c;
    font-size: 14px;
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;

}
h1 {
  color: #42b983;
}
section {
    border-radius: 5px;
    background-color: #fff;
}
.wrapper {
    position: relative;
    top: 0;
    height: 100vh;
}
.steps-footer {
    padding: 20px 0px;
}
.el-step .el-step__title {
    font-size: 12px;
    line-height:15px;
}

.el-step.is-vertical .el-step__title {
    font-size: 14px;
    line-height:18px;
    margin-bottom: 20px;
}
.el-step.is-vertical .el-step__icon {
    background-color: #F2F6FC;
}
.el-container {
    height: 100vh;
}
.el-aside {
    /* 
    background-color: #F2F6FC;
    border-right: 1px solid #EBEEF5;
    font-size: 11px;
    */
    background-color: #F96332;
    webkit-box-shadow: 0px 2px 22px 0 rgba(0, 0, 0, 0.2), 0px 2px 30px 0 rgba(0, 0, 0, 0.35);
    box-shadow: 0px 2px 22px 0 rgba(0, 0, 0, 0.2), 0px 2px 30px 0 rgba(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    height: 100%;
    bottom: 0;
    width: 260px;
    left: 0;
    z-index: 1030;
}
.el-header {
    /*
    padding-bottom:10px;
    border-bottom: 1px solid #EBEEF5;
    background-color: #F7F7F7;
    height: 260px;
    */
    padding-top: 80px;
    padding-bottom: 45px;
    background: #141E30;
    background: -webkit-gradient(linear, left top, right top, from(#0c2646), color-stop(60%, #204065), to(#2a5788));
    background: linear-gradient(to right, #0c2646 0%, #204065 60%, #2a5788 100%);
    position: relative;
    overflow: hidden;
}
.el-main {
    padding: 0 30px 30px;
    min-height: calc(100vh - 123px);
    margin-top: -30px;
    position: relative;
    float: right;
    /* width: calc(100% - 260px); */
    background-color: #E3E3E3;
    background-color: #ebecf1;
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.el-footer {
    padding-top:20px;
    border-top: 1px solid #EBEEF5;
    background-color: #F7F7F7;
}
.el-submenu, div.el-menu-item {
    margin-top: 20px;
}
.el-submenu .el-menu-item {
    height: 30px;
    line-height: 30px;
}
.el-menu-item .el-submenu__title {
    height: 35px;
    line-height: 35px;
    padding-top: 10px
}
.el-submenu__title {
    height: 36px;
    line-height: 36px;
}
.el-form-item__content {
    line-height: 20px;
}
.lot-card {
    background-color: #F2F6FC;
    border: 1px solid #EBEEF5;
    border-radius: 5px;
    padding: 20px;
}
.lot-image {
    font-size:64px;
    text-align:center;
    padding-top:40px;
}
.report-sous-lot {
    margin-left:-20px;
    margin-bottom:5px;
}
.el-alert {
  margin-top:10px;
}
</style>


