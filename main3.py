from fpdf import FPDF
pdf = FPDF()
pdf.add_page()
pdf.output(f'./example2.pdf', 'f')