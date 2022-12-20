from django.shortcuts import HttpResponse
from banks.models import Bank, Branch
from django.contrib.auth import get_user
import json
from django.views.generic import FormView, ListView, DeleteView, UpdateView
from banks.forms import BankForm, BranchForm
from django.urls import reverse
from django.utils import timezone



# Create your views here.
class add_bank_pg(FormView):

    form_class = BankForm
    template_name = 'add_bank.html'

    def get_success_url(self):
        # print("---------------121--------------not here--------------")
        return reverse('bank_det', kwargs={'bank_id': self.kwargs['bank_id']})

    def form_valid(self, form):
        # print("--------------------333- not here--------------------------")
        self.kwargs['bank_id'] = \
            Bank.objects.create(owner=self.request.user, **form.cleaned_data).id
        return super().form_valid(form)

    def get(self, request, *args, **kwargs):

        user = get_user(request)
        if user.id:
            return super().get(request, *args, **kwargs)
        return HttpResponse('UNAUTHORIZED', status=401)


class add_branch_pg(FormView):

    form_class = BranchForm
    template_name = 'add_branch.html'
    def get_success_url(self):
        # print("----------------------1---------------------------------------")
        return reverse('branch_det', kwargs={'branch_id': self.kwargs['branch_id']})

    def form_valid(self, form):
        # print("---------------------88------not here-------------------")
        bank = Bank.objects.get(id=self.kwargs['bank_id']) #no
        # print("---------------------88------not here-------------------")
        self.kwargs['branch_id'] = Branch.objects.create(last_modified=timezone.now(),
                                                         bank=bank,**form.cleaned_data).id
        return super().form_valid(form)

    def get(self, request, *args, **kwargs):

        user = get_user(request)
        if user.id:
            return super().get(request, *args, **kwargs)
        return HttpResponse('UNAUTHORIZED', status=401)


def branch_det(request, branch_id):

    # print("qwqwq", user.id)
    # print("----1111---------------------------------------------------------")
    branch = Branch.objects.get(id=branch_id)
    if not branch:
        return HttpResponse('NOT FOUND', status=404)
    data = {"id": branch.id, "name": branch.name, "transit_num": branch.transit_num,
            "address": branch.address, "email": branch.email, "capacity": branch.capacity,
            "last_modified": str(branch.last_modified)}
    # print(data)
    return HttpResponse(json.dumps(data))


def all_branch(request, branch_id):
    # print("?????????????")
    branch = Branch.objects.filter(id=branch_id)
    if not branch:
        return HttpResponse('NOT FOUND', status=404)

    all = []
    for b in branch:
        all.append(
            {"id": b.id, "name": b.name, "transit_num": b.transit_num,
            "address": b.address, "email": b.email, "capacity": b.capacity,
            "last_modified": str(b.last_modified)})
    return HttpResponse(json.dumps(all))


class all_bank(ListView):
    queryset = Bank.objects.all()
    template_name = "all_banks.html"
    context_object_name = "banks"


class bank_det(DeleteView):
    template_name = "bank_det.html"
    context_object_name = "bank"

    def get_object(self, queryset=None):

        if Bank.objects.get(id=self.kwargs['bank_id']):
            return Bank.objects.get(id=self.kwargs['bank_id'])
        else:
            return HttpResponse('NOT FOUND', status=404)



class edit_branch(UpdateView):
    form_class = BranchForm
    template_name = "add_bank.html"
    context_object_name = "branch"

    def get_object(self, queryset=None):
        user = get_user(self.request)
        if user.id:
            if user == Branch.objects.get(id=self.kwargs['branch_id']).bank.owner:
                return Branch.objects.get(id=self.kwargs['branch_id'])
            else:
                return HttpResponse('FORBIDDEN', status=403)

        else:
            return HttpResponse('UNAUTHORIZED', status=401)

    def get_success_url(self):
        return reverse('branch_det', kwargs={'branch_id': self.kwargs['branch_id']})
