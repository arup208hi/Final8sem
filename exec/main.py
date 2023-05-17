from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'My PDF Document', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, title, 0, 1, 'L')

    def chapter_content(self, content):
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, content)
        self.ln()

# Create a new PDF object
pdf = PDF()
pdf.add_page()

# Add content to the PDF
pdf.chapter_title('Chapter 1')
pdf.chapter_content('This is the content of Chapter 1.')

pdf.chapter_title('Chapter 2')
pdf.chapter_content('This is the content of Chapter 2.')

# Set the file path and file name
file_path = 'assets/pdf/hahahaha/'
file_name = 'output.pdf'

# Save the PDF file
pdf_file_path = file_path + file_name
pdf.output(pdf_file_path)
print('PDF file generated successfully.')
