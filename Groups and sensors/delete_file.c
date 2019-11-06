#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define BUFFER_SIZE 1000

void removeAll(char * str, const char * toRemove);

int main (){
FILE * fptr;
FILE * fTemp;

char path[100];
char toRemove[100];
char buffer[1000];

printf("Enter device name to be removed:\n");
scanf("%s", toRemove);

fptr = fopen("SensorsApp.txt","a+");
fTemp = fopen("temp.txt", "a+");

if(fptr == NULL || fTemp == NULL)
{
 printf("\nUnable to open file\n");
 exit(EXIT_SUCCESS);
}

while ((fgets(buffer, BUFFER_SIZE, fptr))!=NULL)
{
 removeAll(buffer, toRemove);

fputs(buffer, fTemp);

}

fclose(fptr);
fclose(fTemp);

remove("SensorsApp.txt");
rename("temp.txt", "SensorsApp.txt");

char *line_buf = NULL;
size_t line_buf_size = 0;
int line_count = 0;
ssize_t line_size;
FILE * fp = fopen("SensorsApp.txt", "r");
line_size = getline(&line_buf, &line_buf_size, fp);
printf("The connected devices are:\n");
while(line_size>=0)
{
// char check[10] = &line_buf;
// if(check == '' || check == ' ')
// {
// }
// else
// {

 line_count++;
 printf("%s", line_buf);
 line_size = getline(&line_buf, &line_buf_size, fp);
// }
}
    
// counter++;
printf("No. of connected devices: %d\n", line_count);



return 0;

}

void removeAll(char *str, const char * toRemove)
{
 int i,j, stringLen, toRemoveLen;
 int found;

 stringLen = strlen(str);
 toRemoveLen = strlen(toRemove);
 
 for(i=0; i<=stringLen-toRemoveLen; i++)
{
 found=1;
 for(j=0; j < toRemoveLen; j++)
 {
  if(str[i+j] != toRemove[j])
  {
   found = 0;
   break;
  }
 }
 if( found == 1)
 {
  for(j=i; j<= stringLen - toRemoveLen; j++)
  {
   str[j] = str[j + toRemoveLen];
  }
  stringLen = stringLen - toRemoveLen;
  i--;
 }
}
}



