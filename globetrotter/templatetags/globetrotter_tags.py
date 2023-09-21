from django import template
from datetime import datetime
import humanize

register = template.Library()

@register.simple_tag()
def get_item(dict,key):
    return dict.get(key)

@register.simple_tag()
def formatcurrency(value):
    return "£{:,.2f}".format(value)

@register.simple_tag()
def formatcurrency_transaction(transaction):
    value = transaction._in - transaction._out
    if value > 0:
        return "+£{:,.2f}".format(value)
    elif value < 0:
        return "-£{:,.2f}".format(-1*value)
    else:
        return "£{:,.2f}".format(value)

@register.simple_tag()
def humanize_date_str(date:str):
    date = datetime.strptime(date, "%Y-%m-%d")
    return humanize.naturalday(date, format="%b %d %Y").title()


@register.simple_tag()
def humanize_date(date:datetime.date):
    return humanize.naturalday(date, format="%b %d %Y").title()

@register.simple_tag()
def get_transaction_value(transaction):
    value = transaction._in - transaction._out
    if value > 0: str()