<template>
    <div>
        <h1>ElectroGloss</h1>

        <h3>Add a Term</h3>

        <form @submit.prevent="addNewTerm">
            <div class="row">
                <div class="four columns">
                    <label for="termName">Name</label>
                    <input class="u-full-width" type="text" v-model="newTerm.name" placeholder="Name" id="termName" />
                </div>
                <div class="eight columns">
                    <label for="termDescription">Description</label>
                    <input class="u-full-width" type="text" v-model="newTerm.description" placeholder="Description" id="termDescription" />
                </div>
            </div>
            <div class="row">
                <div class="four columns">
                    <label for="newTagName">Tags</label>
                    <div v-for="tag in newTerm.tags">
                        <input class="u-full-width" type="text" v-model="tag.value" placeholder="Tag" />
                    </div>
                    <input class="u-full-width" type="text" v-model="newTerm.newTag" ref="newTag" placeholder="Name" id="newTagName">
                    <button @click.prevent="addNewTermTag">Add Tag</button>
                </div>
                <div class="four columns">
                    <label for="termName">Other Definitions</label>
                    <div v-for="otherName in newTerm.otherNames">
                        <input class="u-full-width" type="text" v-model="otherName.value" placeholder="Other Name" />
                    </div>
                    <input class="u-full-width" type="text" v-model="newTerm.newOtherName" ref="newOtherName" placeholder="Other Name" id="newOtherName">
                    <button @click.prevent="addNewOtherName">Add Other Definition</button>
                </div>
                <div class="four columns">
                    <label for="termName">Disambiguation</label>
                    <div v-for="disambiguation in newTerm.disambiguations">
                        <input class="u-full-width" type="text" v-model="disambiguation.value" placeholder="Disambiguation" />
                    </div>
                    <input class="u-full-width" type="text" v-model="newTerm.newDisambiguation" ref="newDisambiguation" placeholder="Disambiguation"
                        id="newDisambiguation">
                        <button @click.prevent="addNewDisambiguation">Add Disambiguation</button>
                </div>
            </div>
            <div class=text-center>
                <button class="button-primary" type="submit" disabled="disabled" :disabled="!newTermValid">Submit</button>
            </div>
        </form>

        <term-list v-for="term in terms" :term="term"></term-list>

        <yml-preview :yml="ymlOutput" v-show="terms.length > 0"></yml-preview>
    </div>
</template>

<script>
    const store = require('electron').remote.getGlobal('store');

    export default {
        data: {
            terms: [],
            newTerm: {
                name: '',
                description: '',
                newTag: '',
                tags: [],
                newOtherName: '',
                otherNames: [],
                newDisambiguation: '',
                disambiguations: []
            }
        },
        methods: {
            addNewTermTag: function () {
                this.newTerm.tags.push({ value: this.newTerm.newTag });
                this.newTerm.newTag = '';
                this.$refs.newTag.focus();
            },
            addNewOtherName: function () {
                this.newTerm.otherNames.push({ value: this.newTerm.newOtherName });
                this.newTerm.newOtherName = '';
                this.$refs.newOtherName.focus();
            },
            addNewDisambiguation: function () {
                this.newTerm.disambiguations.push({ value: this.newTerm.newDisambiguation });
                this.newTerm.newDisambiguation = '';
                this.$refs.newDisambiguation.focus();
            },
            addNewTerm: function () {
                if (this.newTerm.name.length > 0 && this.newTerm.description.length > 0) {
                    this.terms.push({
                        name: this.newTerm.name,
                        description: this.newTerm.description,
                        tags: this.newTerm.tags.map(function (item) {
                            return item.value;
                        }),
                        otherNames: this.newTerm.otherNames.map(function (item) {
                            return item.value;
                        }),
                        disambiguations: this.newTerm.disambiguations.map(function (item) {
                            return item.value;
                        })
                    });
                    this.newTerm.name = '';
                    this.newTerm.description = '';
                    this.newTerm.tags = [];
                    this.newTerm.otherNames = [];
                    this.newTerm.disambiguations = [];

                    store.set('terms', this.terms);
                }
            }
        },
        computed: {
            newTermValid: function () {
                return this.newTerm.name.length > 0 && this.newTerm.description.length > 0
            },
            ymlOutput: function () {
                var output = '';

                for (var i = 0; i < this.terms.length; i++) {
                    output += this.terms[i].name + ':\n';
                    output += '  - ' + this.terms[i].description + '\n';

                    if (this.terms[i].tags.length > 0)
                        output += '  - [' + this.terms[i].tags.join(', ') + ']\n';

                    if (this.terms[i].otherNames.length > 0)
                        output += '  - ' + this.terms[i].otherNames.join(', ') + '\n';

                    if (this.terms[i].disambiguations.length > 0)
                        output += '  - ' + this.terms[i].disambiguations.map(function (item) {
                            return '\xAC' + item;
                        }).join(', ') + '\n';
                }

                return output;
            }
        },
        mounted: function () {
            this.terms = store.get('terms');
        },
        // updated: function () {

        // }
    }
</script>