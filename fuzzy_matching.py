from rapidfuzz import fuzz
from rapidfuzz import process
import pandas as pd

df_tbl_list = pd.read_csv('fdr_tables.csv', names=['tbl_name', 'col_name', 'datatype', 'nullable'])
df_search_list = pd.read_csv('search_list.csv', names=['col_name'])

for col in df_search_list.col_name:
    res = process.extractOne(col, df_tbl_list.col_name, scorer=fuzz.ratio)
    df_res = df_tbl_list.iloc[res[2]]
    print(col+','+df_res.tbl_name+','+df_res.col_name+','+df_res.datatype+','+df_res.nullable+','+str(res[1]))