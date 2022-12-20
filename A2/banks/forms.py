from django import forms
import banks.models


class BankForm(forms.ModelForm):

    class Meta:

        model = banks.models.Bank

        fields = ["name", "description", "inst_num", "swift_code"]

        widgets = {"name": forms.TextInput,
                   "description": forms.TextInput,
                   "inst_num": forms.TextInput,
                   "swift_code": forms.TextInput}


class BranchForm(forms.ModelForm):

    class Meta:

        model = banks.models.Branch

        fields = ["name", "transit_num", "address", "email", "capacity"]

        widgets = {"name": forms.TextInput,
                   "transit_num": forms.TextInput,
                   "address": forms.TextInput,
                   "email": forms.TextInput,
                   "capacity": forms.TextInput}
