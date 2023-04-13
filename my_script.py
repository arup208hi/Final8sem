import pandas as pd
import numpy as np
import random

import pymongo
from pymongo import MongoClient

connection = MongoClient('localhost', 27017)
# Database Name
db = connection["endterm"]
 
# Collection Name
col = db["exceldatas"]
x = col.find()

# for data in x:
#     print(data)
    
df=pd.DataFrame(list(col.find()))
df.drop

df1=df.groupby('Marks')
df1.get_group("5")
df69=pd.DataFrame()

l=["5","1"]
for i in l:
    
    
    df2=(df1.get_group(i))
    
    
    
    df2=df2.drop(['_id','Paper Code','Paper Title','Name of the Program','Semester'],axis=1)
    df69=df69.append(df2,ignore_index=True)
    
    
    
    
    
    df3=df2['Question'].tolist()
   
    
    if i=="1":
        df44=random.sample(df3,5)
        
        
    elif i=="5":    
        df55=random.sample(df3,3)
        
df66=''
q=''
co=''
d=1
f=1


for i in df44:
    df88=df2.loc[df2['Question']==i]
    q=df88['Course Outcome'].tolist()
    co=df88['Marks'].tolist()
    df66+=(str(d)+'> '+i)+'           '+str(q)+'           '+str(co)+"\n"
    d+=1
df66+='-----------------------------------------------------------------------------------------------------------'
q1=''
co1=''
for i in df55:
    df89=df69.loc[df69['Question']==i]
    q1=df89['Course Outcome'].tolist()
    
    co1=df89['Marks'].tolist()
    df66+=(str(d)+'> '+i)+'           '+'['+str(q1[0])+']'+'           '+'['+str(co1[0])+']'+"\n"
    d+=1
df66+='--------------------------------------------------------------------------------------------------------------'
type(df66)
    
 
    




        

    
# Main1
from fpdf import FPDF 
from fpdf.enums import XPos, YPos

class PDF(FPDF):
    def create_table(self, table_data, title='', data_size = 10, title_size=12, align_data='L', align_header='L', cell_width='even', x_start='x_default',emphasize_data=[], emphasize_style=None,emphasize_color=(0,0,0)):
        """
        table_data:
                    list of lists with first element being list of headers
        title:
                    (Optional) title of table (optional)
        data_size:
                    the font size of table data
        title_size:
                    the font size fo the title of the table
        align_data:
                    align table data
                    L = left align
                    C = center align
                    R = right align
        align_header:
                    align table data
                    L = left align
                    C = center align
                    R = right align
        cell_width:
                    even: evenly distribute cell/column width
                    uneven: base cell size on lenght of cell/column items
                    int: int value for width of each cell/column
                    list of ints: list equal to number of columns with the widht of each cell / column
        x_start:
                    where the left edge of table should start
        emphasize_data:  
                    which data elements are to be emphasized - pass as list
                    emphasize_style: the font style you want emphaized data to take
                    emphasize_color: emphasize color (if other than black)
       
        """
        default_style = self.font_style
        if emphasize_style == None:
            emphasize_style = default_style
        # default_font = self.font_family
        # default_size = self.font_size_pt
        # default_style = self.font_style
        # default_color = self.color # This does not work

        # Get Width of Columns
        def get_col_widths():
            col_width = cell_width
            if col_width == 'even':
                col_width = self.epw / len(data[0]) - 1  # distribute content evenly   # epw = effective page width (width of page not including margins)
            elif col_width == 'uneven':
                col_widths = []

                # searching through columns for largest sized cell (not rows but cols)
                for col in range(len(table_data[0])): # for every row
                    longest = 0
                    for row in range(len(table_data)):
                        cell_value = str(table_data[row][col])
                        value_length = self.get_string_width(cell_value)
                        if value_length > longest:
                            longest = value_length
                    col_widths.append(longest + 4) # add 4 for padding
                col_width = col_widths



                        ### compare columns

            elif isinstance(cell_width, list):
                col_width = cell_width  # TODO: convert all items in list to int        
            else:
                # TODO: Add try catch
                col_width = int(col_width)
            return col_width

        # Convert dict to lol
        # Why? because i built it with lol first and added dict func after
        # Is there performance differences?
        if isinstance(table_data, dict):
            header = [key for key in table_data]
            data = []
            for key in table_data:
                value = table_data[key]
                data.append(value)
            # need to zip so data is in correct format (first, second, third --> not first, first, first)
            data = [list(a) for a in zip(*data)]

        else:
            header = table_data[0]
            data = table_data[1:]

        line_height = self.font_size * 2.5

        col_width = get_col_widths()
        self.set_font(size=title_size)

        # Get starting position of x
        # Determin width of table to get x starting point for centred table
        if x_start == 'C':
            table_width = 0
            if isinstance(col_width, list):
                for width in col_width:
                    table_width += width
            else: # need to multiply cell width by number of cells to get table width
                table_width = col_width * len(table_data[0])
            # Get x start by subtracting table width from pdf width and divide by 2 (margins)
            margin_width = self.w - table_width
            # TODO: Check if table_width is larger than pdf width

            center_table = margin_width / 2 # only want width of left margin not both
            x_start = center_table
            self.set_x(x_start)
        elif isinstance(x_start, int):
            self.set_x(x_start)
        elif x_start == 'x_default':
            x_start = self.set_x(self.l_margin)


        # TABLE CREATION #

        # add title
        if title != '':
            self.multi_cell(0, line_height, title, border=0, align='j',new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size)
            self.ln(line_height) # move cursor back to the left margin

        self.set_font(size=data_size)
        # add header
        y1 = self.get_y()
        if x_start:
            x_left = x_start
        else:
            x_left = self.get_x()
        x_right = self.epw + x_left
        if  not isinstance(col_width, list):
            if x_start:
                self.set_x(x_start)
            for datum in header:
                self.multi_cell(col_width, line_height, datum, border=0, align=align_header,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size)
                x_right = self.get_x()
            self.ln(line_height) # move cursor back to the left margin
            y2 = self.get_y()
            self.line(x_left,y1,x_right,y1)
            self.line(x_left,y2,x_right,y2)

            for row in data:
                if x_start: # not sure if I need this
                    self.set_x(x_start)
                for datum in row:
                    if datum in emphasize_data:
                        self.set_text_color(*emphasize_color)
                        self.set_font(style=emphasize_style)
                        self.multi_cell(col_width, line_height, datum, border=0, align=align_data,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size)
                        self.set_text_color(0,0,0)
                        self.set_font(style=default_style)
                    else:
                        self.multi_cell(col_width, line_height, datum, border=0, align=align_data,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size) # ln = 3 - move cursor to right with same vertical offset # this uses an object named self
                self.ln(line_height) # move cursor back to the left margin
       
        else:
            if x_start:
                self.set_x(x_start)
            for i in range(len(header)):
                datum = header[i]
                self.multi_cell(col_width[i], line_height, datum, border=0, align=align_header,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size)
                x_right = self.get_x()
            self.ln(line_height) # move cursor back to the left margin
            y2 = self.get_y()
            self.line(x_left,y1,x_right,y1)
            self.line(x_left,y2,x_right,y2)


            for i in range(len(data)):
                if x_start:
                    self.set_x(x_start)
                row = data[i]
                for i in range(len(row)):
                    datum = row[i]
                    if not isinstance(datum, str):
                        datum = str(datum)
                    adjusted_col_width = col_width[i]
                    if datum in emphasize_data:
                        self.set_text_color(*emphasize_color)
                        self.set_font(style=emphasize_style)
                        self.multi_cell(adjusted_col_width, line_height, datum, border=0, align=align_data,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size)
                        self.set_text_color(0,0,0)
                        self.set_font(style=default_style)
                    else:
                        self.multi_cell(adjusted_col_width, line_height, datum, border=0, align=align_data,new_x=XPos.RIGHT, new_y=YPos.TOP, max_line_height=self.font_size) # ln = 3 - move cursor to right with same vertical offset # this uses an object named self
                self.ln(line_height) # move cursor back to the left margin
        y3 = self.get_y()
        self.line(x_left,y3,x_right,y3)
data = [
    ["Name of the program:", "B.tech", "Semester:", "III",], # 'testing','size'],
    ["Course/Subject Name:", "Formal Languages and Automata Theory", "Course/Subject Code:", "CSE11005",], # 'testing','size'],
    ["Maximum Marks:", "50", "Time Duration:", "3 Hrs",], # 'testing','size'],
    ["Total No. of Questions:", "18", "Total No of Pages:", "4",], # 'testing','size'],
     # 'testing','size'],
]




pdf = PDF()
pdf.add_page()
pdf.set_font("Times", size=10)

pdf.create_table(table_data = data,title='Mid Sem Question Paper',emphasize_data=['Name of the program','Semester','Course/Subject Name','Course/Subject Code'],emphasize_style='BIU', cell_width='even')
pdf.ln()

# Main2
import functools 
from functools import cached_property 
from fpdf import FPDF
import tempfile
temp = tempfile.TemporaryFile()
 
# Temporary files are stored here
temp_dir = tempfile.gettempdir()
text_file=open(r"real1.txt","w",encoding="utf-8")
text_file.write(df66)
text_file.close()

pdf = PDF()
pdf.add_page()
pdf.set_font("Times", size=10)

pdf.create_table(table_data = data,title='Mid Sem Question Paper',emphasize_data=['Name of the program','Semester','Course/Subject Name','Course/Subject Code'],emphasize_style='BIU', cell_width='even')
pdf.ln()

pdf.set_font('Arial',size=15)
pdf.cell(200,10,txt="Mid sem question paper",ln=1,align='C')

f=open(r"real1.txt","r",encoding="latin-1")

for x in f:
    pdf.cell(200,10,txt=x,ln=2,align="C")


pdf.output("midsem2.pdf")
